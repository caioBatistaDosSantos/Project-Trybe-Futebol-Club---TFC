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

const TEAM = {
  id: 1,
  teamName: "Avaí/Kindermann"
}

const TEAMS = [
	TEAM,
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
      .resolves(TEAMS as TeamModel[]);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  it('Quando o GET "/teams" acontece corretamente', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(TEAMS)
  });
});

describe('Teste a rota GET "/teams/:id"', () => {
  before(() => {
    sinon
      .stub(TeamModel, "findByPk")
      .resolves(TEAM as TeamModel);
  });

  after(()=>{
    (TeamModel.findByPk as sinon.SinonStub).restore();
  });

  it.only('Quando o GET "/teams/:id" acontece corretamente', async () => {
    const response = await chai.request(app).get('/teams/:id');
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(TEAM)
  });
});
