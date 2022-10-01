import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import {
  matchesList,
  matchesListInProgress,
  matchesListNotProgress,
} from './mocks/matches.mocks';

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
