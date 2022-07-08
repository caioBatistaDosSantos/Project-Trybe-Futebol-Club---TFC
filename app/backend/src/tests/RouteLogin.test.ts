import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota POST "/login"', () => {
  before(() => {
    sinon
      .stub(UserModel, "create")
      .resolves({
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
          // senha: secret_admin
      } as UserModel);
  });

  after(()=>{
    (UserModel.create as sinon.SinonStub).restore();
  })

  it('Quando o login acontece corretamente', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.eql({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NTcyNDQ3ODEsImV4cCI6MTY1NzI1MTk4MX0.oQkGxt7fEtGVjDBjd2L6PL00t6Elzs3xTc92Y-XZOdM" })
  });

  it('Quando o login acontece incorretamente: sem o "email"', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        password: 'secret_admin',
      });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: "All fields must be filled" })
  });

  it('Quando o login acontece incorretamente: sem o campo "password"', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
      });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: "All fields must be filled" })
  });
});
