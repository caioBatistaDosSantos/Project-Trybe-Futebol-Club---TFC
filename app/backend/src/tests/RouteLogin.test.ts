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

  it('Quando cria corretamente', async () => {
    const response = await chai.request(app).post('/login')
      .send({ 
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      });
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.eql({ entity: { token: '' } })
  });
});
