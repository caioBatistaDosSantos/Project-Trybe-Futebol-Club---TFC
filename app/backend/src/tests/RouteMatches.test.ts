import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';
import JWT from '../utils/JWT';

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

describe('Teste a rota POST "/matches"', () => {
  const TOKEN = 'TOKEN_FOR_TESTS';

  const MATCHES = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true,
  };

  const TEAM = {
    id: 1,
    teamName: "Avaí/Kindermann"
  }

  before(() => {
    sinon
      .stub(MatchesModel, "create")
      .resolves(MATCHES as unknown as MatchesModel);

    sinon
      .stub(TeamModel, "findByPk")
      .resolves(TEAM as TeamModel)

    sinon
      .stub(JWT, "verifyToken")
        .resolves(TOKEN);
  });

  after(()=>{
    (MatchesModel.create as sinon.SinonStub).restore();
    (TeamModel.findByPk as sinon.SinonStub).restore();
    (JWT.verifyToken as sinon.SinonStub).restore();
  });

  it('Quando o POST "/matches" acontece corretamente', async () => {
    const response = await chai.request(app).post('/matches')
      .send({
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 2,
      })
      .set('authorization', TOKEN);
    expect(response.status).to.be.equal(StatusCodes.CREATED);
    expect(response.body).to.be.eql(MATCHES)
  });

  it('Quando os times são iguais', async () => {
    const response = await chai.request(app).post('/matches')
      .send({
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 16,
        awayTeamGoals: 2,
      })
      .set('authorization', TOKEN);
    expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.be.eql({ message: 'It is not possible to create a match with two equal teams' });
  });
});

describe('Quando o POST "/matches" acontece incorretamente', () => {
  const TOKEN = 'TOKEN_FOR_TESTS';

  before(() => {
    sinon
      .stub(TeamModel, "findByPk")
      .resolves(null)

    sinon
      .stub(JWT, "verifyToken")
        .resolves(TOKEN);
  });

  after(()=>{
    (TeamModel.findByPk as sinon.SinonStub).restore();
  });
  
  it('Quando os times não existem', async () => {
    const response = await chai.request(app).post('/matches')
      .send({
        homeTeam: 10000,
        homeTeamGoals: 2,
        awayTeam: -1,
        awayTeamGoals: 2,
      })
      .set('authorization', TOKEN);
    expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
    expect(response.body).to.be.eql({ message: 'There is no team with such id!' });
  });
})

// describe.only('Teste a rota PATCH "/matches/:id/finish"', () => {

//   const MATCHES = [0];

//   before(() => {
//     sinon
//       .stub(MatchesModel, "update")
//       .resolves(MATCHES as unknown as MatchesModel);
//   });

//   after(()=>{
//     (MatchesModel.update as sinon.SinonStub).restore();
//   });

//   it('Quando o PATCH "/matches/:id/finish" acontece corretamente', async () => {
//     const response = await chai.request(app).post('/matches');

//     expect(response.status).to.be.equal(StatusCodes.OK);
//     expect(response.body).to.be.eql(MATCHES)
//   });
// });
