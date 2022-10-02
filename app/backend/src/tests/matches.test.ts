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
  invalidTeamId,
  matchesList,
  matchesListInProgress,
  matchesListNotProgress,
  newMatch,
  sameTeamIds,
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
    before(() => {
      sinon.stub(Match, 'update').resolves();
    });

    after(() => {
      (Match.update as sinon.SinonStub).restore();
    });

    it('Deve retornar a mensagem "Finished"', async () => {
      const response = await chai.request(app).patch('/matches/2/finish');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: finishedMatch });
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
