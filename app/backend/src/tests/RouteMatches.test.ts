import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste a rota GET "/matches"', () => {
  const MATCHES = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      }
    },
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Internacional"
      }
    }
  ];

  before(() => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(MATCHES as unknown as MatchesModel[]);
  });

  after(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('Quando o GET "/matches" acontece corretamente', async () => {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(MATCHES)
  });
});

describe('Teste a rota GET "/matches?inProgress=true"', () => {
  const MATCHES = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: true,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      }
    },
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Internacional"
      }
    }
  ];

  before(() => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(MATCHES as unknown as MatchesModel[]);
  });

  after(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('Quando o GET "/matches?inProgress=true" acontece corretamente', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(MATCHES)
  });
});

describe('Teste a rota GET "/matches?inProgress=false"', () => {
  const MATCHES = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      }
    },
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Internacional"
      }
    }
  ];

  before(() => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(MATCHES as unknown as MatchesModel[]);
  });

  after(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('Quando o GET "/matches?inProgress=false" acontece corretamente', async () => {
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(StatusCodes.OK);
    expect(response.body).to.be.eql(MATCHES)
  });
});