import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { after, before } from 'mocha';
import Match from '../database/models/Match';
import { errorMessage, generalLeaderboard, leaderboardAway, leaderboardHome } from './mocks/leaderboard.mocks';
import ILeaderboard from '../interfaces/ILeaderboard.interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET', () => {
  describe('Rota /leaderboard/home', () => {
    describe('Quando a requisição é feita com sucesso', () => {
      before(() => {
        const { sequelize } = Match;
        if (sequelize) {
          sinon.stub(sequelize, 'query').resolves(leaderboardHome as [unknown[], unknown]);
        }
      });

      after(() => {
        sinon.restore();
      });

      it('Deve retornar o status 200 e um array com o placar dos times da casa', async () => {
        const response = await chai.request(app).get('/leaderboard/home');

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(leaderboardHome);
      });
    });

    describe('Quando algo da errado', () => {
      before(() => {
        const { sequelize } = Match;
        if (sequelize) {
          sinon.stub(sequelize, 'query').resolves(undefined);
        }
      });

      after(() => {
        sinon.restore();
      });

      it('Deve retornar o status 500 e uma mensagem de erro ', async () => {
        const response = await chai.request(app).get('/leaderboard/home');

        expect(response.status).to.equal(500);
        expect(response.body).to.deep.equal({ message: errorMessage });
      });
    });
  });

  describe('Rota /leaderboard/away', () => {
    describe('Quando a requisição é feita com sucesso', () => {
      before(() => {
        const { sequelize } = Match;
        if (sequelize) {
          sinon.stub(sequelize, 'query').resolves(leaderboardAway as [unknown[], unknown]);
        }
      });

      after(() => {
        sinon.restore();
      });

      it('Deve retornar o status 200 e um array com o placar dos times visitantes', async () => {
        const response = await chai.request(app).get('/leaderboard/away');

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(leaderboardAway);
      });
    });

    describe('Quando algo da errado', () => {
      before(() => {
        const { sequelize } = Match;
        if (sequelize) {
          sinon.stub(sequelize, 'query').resolves(undefined);
        }
      });

      after(() => {
        sinon.restore();
      });

      it('Deve retornar o status 500 e uma mensagem de erro ', async () => {
        const response = await chai.request(app).get('/leaderboard/away');

        expect(response.status).to.equal(500);
        expect(response.body).to.deep.equal({ message: errorMessage });
      });
    });
  });

  describe('Rota /leaderboard', () => {
    before(() => {
      if(!Match.sequelize?.query) return;
      sinon.stub(Match.sequelize, 'query')
      .onFirstCall().resolves(leaderboardHome as any)
      .onSecondCall().resolves(leaderboardAway as any);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar o status 200 e um array com o placar geral de todos os times', async () => {
      const response = await chai.request(app).get('/leaderboard');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(generalLeaderboard);
    })
  });
});
