import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import { matchesList } from './mocks/matches.mocks';
import Team from '../database/models/Team';

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
});
