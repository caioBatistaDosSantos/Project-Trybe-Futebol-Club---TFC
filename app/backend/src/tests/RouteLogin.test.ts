import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import JWT from '../utils/generateJWT';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota POST "/login"', () => {
  const TOKEN = 'TOKEN_FOR_TESTS';

  before(() => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
          // senha: secret_admin
      } as UserModel);

    sinon
      .stub(JWT, "generateJwt")
      .resolves(TOKEN);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
    (JWT.generateJwt as sinon.SinonStub).restore();
  });

  it('Quando o login acontece corretamente', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql({ token: TOKEN })
  });

  it('sem o campo "email"', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        password: 'secret_admin',
      });
    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: "All fields must be filled" })
  });

  it('sem o campo "password"', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
      });
    expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(response.body).to.be.eql({ message: "All fields must be filled" })
  });

  it('com o campo "password" incorreto', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin_incorrect',
      });
    expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.be.eql({ message: "Incorrect email or password" })
  });
});

describe('Quando o login acontece incorretamente:', () => {
  before(() => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(null as unknown as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('com o campo "email" incorreto', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com_incorrect',
        password: 'secret_admin',
      });
    expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.be.eql({ message: "Incorrect email or password" })
  });
});

describe('Teste a rota GET "/login/validate"', () => {
  const DECODE = 'admin';

  before(() => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
          // senha: secret_admin
      } as UserModel);

    sinon
      .stub(JWT, "generateJwt")
      .resolves(DECODE);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
    (JWT.generateJwt as sinon.SinonStub).restore();
  });

  it('Quando o login acontece corretamente', async () => {
    const response = await chai.request(app).get('/login/validate')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql({ role: DECODE })
  });
});
