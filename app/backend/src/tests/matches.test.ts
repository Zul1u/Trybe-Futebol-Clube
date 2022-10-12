import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import {
  bodyOfNewMatch,
  failCreateMatch,
  finishedMatch,
  inProgressRequired,
  invalidTeamId,
  matchAlreadyFinished,
  matchesList,
  matchesListInProgress,
  matchesListNotProgress,
  matchInprogress,
  matchNotInProgress,
  newMatch,
  sameTeamIds,
  teamGoalsRequired,
  teamRequired,
  updatedMatchScore,
  updateMatchScore,
} from './mocks/matches.mocks';
import { invalidToken, mockToken, tokenNotFound } from './mocks/token.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET', () => {
  describe('Rota /matches', () => {
    before(() => {
      sinon.stub(Match, 'findAll').resolves(matchesList as Match[]);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Deve retornar uma lista com todas as partidas', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(matchesList);
    })
  });

  describe('Rota /matches/matches?inProgress=?', () => {
    describe('Quando é passado true para a query', () => {
      before(() => {
        sinon.stub(Match, 'findAll').resolves(matchesListInProgress as Match[]);
      });

      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      });

      it('Deve retornar uma lista com todas as partidas que estão em progreço', async () => {
        const response = await chai.request(app).get('/matches/matches?inProgress=true');
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(matchesListInProgress);
      });
    });

    describe('Quando é passado false para a query', () => {
      before(() => {
        sinon.stub(Match, 'findAll').resolves(matchesListNotProgress as Match[]);
      });

      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      });

      it('Deve retornar uma lista com todas as partidas que não estão em progreço', async () => {
        const response = await chai.request(app).get('/matches/matches?inProgress=false');
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(matchesListNotProgress);
      });
    });

    describe('Quando não é passado uma query', () => {
      before(() => {
        sinon.stub(Match, 'findAll').resolves(matchesList as Match[]);
      });

      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      });

      it('Deve retornar uma lista com todas as partidas', async () => {
        const response = await chai.request(app).get('/matches/matches?inProgress=');
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(matchesList);
      });
    });
  });
});

describe('PATCH', () => {
  describe('Rota /matches/:id/finish', () => {
    describe('Quando é passado o id de uma partida inexistente', () => {
      before(() => {
        sinon.stub(Match, 'findByPk').resolves(null);
        sinon.stub(Match, 'update').resolves();
      });
  
      after(() => {
        (Match.findByPk as sinon.SinonStub).restore();
        (Match.update as sinon.SinonStub).restore();
      });
  
      it('Deve retornar a mensagem "There is no team with such id!"', async () => {
        const response = await chai.request(app).patch('/matches/0/finish');
  
        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({ message: invalidTeamId });
      });
    });

    describe('Quando é passado o id de uma partida que ja acabou', () => {
      before(() => {
        sinon.stub(Match, 'findByPk').resolves(matchNotInProgress as Match);
        sinon.stub(Match, 'update').resolves();
      });
  
      after(() => {
        (Match.findByPk as sinon.SinonStub).restore();
        (Match.update as sinon.SinonStub).restore();
      });
  
      it('Deve retornar a mensagem "this match has already finished"', async () => {
        const response = await chai.request(app).patch('/matches/1/finish');
  
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: matchAlreadyFinished });
      });
    });

    describe('Quando a partida é finalizada com sucesso', () => {
      before(() => {
        sinon.stub(Match, 'findByPk').resolves(matchInprogress as Match);
        sinon.stub(Match, 'update').resolves();
      });
  
      after(() => {
        (Match.findByPk as sinon.SinonStub).restore();
        (Match.update as sinon.SinonStub).restore();
      });
  
      it('Deve retornar a mensagem "Finished"', async () => {
        const response = await chai.request(app).patch('/matches/48/finish');
  
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({ message: finishedMatch });
      });
    });
  });

  describe('Rota /matches/:id', () => {
    describe('Quando a requisição é feita com sucesso', () => {
      before(() => {
        sinon.stub(Match, 'update').resolves();
        sinon.stub(Match, 'findByPk').resolves(updatedMatchScore as Match);
      });

      after(() => {
        (Match.update as sinon.SinonStub).restore();
        (Match.findByPk as sinon.SinonStub).restore();
      });

      it('Deve retornar a mensagem "Finished"', async () => {
        const response = await chai.request(app).patch('/matches/2').send(updateMatchScore);

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(updatedMatchScore);
      });
    });

    describe('Quando é passado um id invalido', () => {
      before(() => {
        sinon.stub(Match, 'update').resolves();
        sinon.stub(Match, 'findByPk').resolves(null);
      });

      after(() => {
        (Match.update as sinon.SinonStub).restore();
        (Match.findByPk as sinon.SinonStub).restore();
      });

      it('Deve retornar a mensagem "Finished"', async () => {
        const response = await chai.request(app).patch('/matches/2').send(updateMatchScore);

        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({ message: invalidTeamId });
      });
    });
  });
});

describe('POST', () => {
  describe('Rota /matches', () => {
    describe('Quando é passado um token invalido', () => {
      before(() => {
        sinon.stub(Match, 'create').resolves(newMatch as Match);
      });

      after(() => {
        (Match.create as sinon.SinonStub).restore();
      });

      it('Não deve ser possivel criar uma nova partida', async () => {
        const response = await chai.request(app).post('/matches').set('Authorization', 'token123');

        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({ message: invalidToken })
      });
    });

    describe('Quando não é passado um token', () => {
      before(() => {
        sinon.stub(Match, 'create').resolves(newMatch as Match);
      });

      after(() => {
        (Match.create as sinon.SinonStub).restore();
      });

      it('Não deve ser possivel criar uma nova partida', async () => {
        const response = await chai.request(app).post('/matches').set('Authorization', '');

        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({ message: tokenNotFound })
      });
    });

    describe('Quando os campos são preenchidos incorretamente ou não são preenchidos', () => {
      before(() => {
        sinon.stub(Match, 'create').resolves(newMatch as Match);
      });

      after(() => {
        (Match.create as sinon.SinonStub).restore();
      });

      it('Não deve ser possivel criar uma nova partida quando o campo homeTeam não é informado', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(failCreateMatch[3])
          .set('Authorization', mockToken);

        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: teamRequired })
      });

      it('Não deve ser possivel criar uma nova partida quando o campo homeTeamGoals não é informado', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(failCreateMatch[4])
          .set('Authorization', mockToken);

        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: teamGoalsRequired })
      });

      it('Não deve ser possivel criar uma nova partida quando o campo awayTeam não é informado', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(failCreateMatch[5])
          .set('Authorization', mockToken);

        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: teamRequired })
      });

      it('Não deve ser possivel criar uma nova partida quando o campo awayTeamGoals não é informado', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(failCreateMatch[6])
          .set('Authorization', mockToken);

        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: teamGoalsRequired })
      });

      it('Não deve ser possivel criar uma nova partida quando o campo inProgress não é informado', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(failCreateMatch[7])
          .set('Authorization', mockToken);

        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: inProgressRequired })
      });
    });

    describe('Quando é passado o id de um time que não existe', () => {
      before(() => {
        sinon.stub(Match, 'create').resolves(newMatch as Match);
      });

      after(() => {
        (Match.create as sinon.SinonStub).restore();
      });

      it('Não deve ser possivel criar uma nova partida (homeTeam)', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(failCreateMatch[0])
          .set('Authorization', mockToken);

        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({ message: invalidTeamId })
      });

      it('Não deve ser possivel criar uma nova partida (awayTeam)', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(failCreateMatch[1])
          .set('Authorization', mockToken);

        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({ message: invalidTeamId })
      });
    });

    describe('Quando são passados ids iguais para ambos os times', () => {
      before(() => {
        sinon.stub(Match, 'create').resolves(newMatch as Match);
      });

      after(() => {
        (Match.create as sinon.SinonStub).restore();
      });

      it('Não deve ser possivel criar uma nova partida', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(failCreateMatch[2])
          .set('Authorization', mockToken);

        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({ message: sameTeamIds })
      });
    });

    describe('Quando todas as informações são passadas corretamente', () => {
      before(() => {
        sinon.stub(Match, 'create').resolves(newMatch as Match);
      });

      after(() => {
        (Match.create as sinon.SinonStub).restore();
      });

      it('Deve ser possivel criar uma nova partida', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .send(bodyOfNewMatch)
          .set('Authorization', mockToken);

        expect(response.status).to.equal(201);
        expect(response.body).to.deep.equal(newMatch)
      });
    })
  });
});
