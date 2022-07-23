import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';

import {
  MATCHES, TEAMS, LEADERBOARD_ALL, LEADERBOARD_HOME, LEADERBOARD_AWAY,
} from './utilsForTests';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste as rotas "/leaderboard*"', () => {
  before(() => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(MATCHES as unknown as MatchesModel[]);

    sinon
      .stub(TeamModel, "findAll")
      .resolves(TEAMS as TeamModel[]);
  });

  after(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  it('Quando o GET "/leaderboard" acontece corretamente', async () => {
    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(LEADERBOARD_ALL)
  });

  it('Quando o GET "/leaderboard/home" acontece corretamente', async () => {
    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(LEADERBOARD_HOME)
  });

  it('Quando o GET "/leaderboard/away" acontece corretamente', async () => {
    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(LEADERBOARD_AWAY)
  });
});