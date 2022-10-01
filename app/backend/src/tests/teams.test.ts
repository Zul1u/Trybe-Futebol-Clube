import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import { idNotFound, team, teams } from './mocks/teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET', () => {
  describe('Rota /teams', () => {
    before(() => {
      sinon.stub(Team, 'findAll').resolves(teams as Team[]);
    });

    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Deve listar todos os times do banco de dados', async () => {
      const response = await chai.request(app).get('/teams').send(teams);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(teams);
    });
  });

  describe('Rota /teams/:id', () => {
    describe('Quando é efetuado uma busca por um Id valido', () => {
      before(() => {
        sinon.stub(Team, 'findByPk').resolves(team as Team);
      });
  
      after(() => {
        (Team.findByPk as sinon.SinonStub).restore();
      });

      it('Deve retornar o time referenete ao id da busca', async () => {
        const response = await chai.request(app).get('/teams/1');

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(team);
      });
    });

    describe('Quando é efetuado uma busca por um Id invalido', () => {
      before(() => {
        sinon.stub(Team, 'findByPk').resolves(null);
      });
  
      after(() => {
        (Team.findByPk as sinon.SinonStub).restore();
      });

      it('Deve retornar a mensagem "ID not found"', async () => {
        const response = await chai.request(app).get('/teams/2');

        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({ message: idNotFound });
      })
    });
  });
});
