import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const TEAMS = [
	{
		id: 1,
		teamName: "Avaí/Kindermann"
	},
	{
		id: 2,
		teamName: "Bahia"
	},
	{
		id: 3,
		teamName: "Botafogo"
	},
]

describe('Teste a rota GET "/teams"', () => {
  before(() => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(TEAMS as TeamModel);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  it.only('Quando o GET acontece corretamente', async () => {
    const response = await chai.request(app).post('/teams');
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(TEAMS)
  });

  // it('sem o campo "email"', async () => {
  //   const response = await chai.request(app).post('/login')
  //     .send({
  //       password: 'secret_admin',
  //     });
  //   expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
  //   expect(response.body).to.be.eql({ message: "All fields must be filled" })
  // });

  // it('sem o campo "password"', async () => {
  //   const response = await chai.request(app).post('/login')
  //     .send({
  //       email: 'admin@admin.com',
  //     });
  //   expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
  //   expect(response.body).to.be.eql({ message: "All fields must be filled" })
  // });

  // it('com o campo "password" incorreto', async () => {
  //   const response = await chai.request(app).post('/login')
  //     .send({
  //       email: 'admin@admin.com',
  //       password: 'secret_admin_incorrect',
  //     });
  //   expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
  //   expect(response.body).to.be.eql({ message: "Incorrect email or password" })
  // });
});
