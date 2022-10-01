import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
import { after, before } from 'mocha';
import {
  fieldFillMessage,
  incorrectDataMessage,
  incorrectLogins,
  invalidToken,
  mockToken,
  payload,
  SERVER_ERROR,
  tokenNotFound,
  userIfos,
  userLogin
} from './mocks/login.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  describe('POST', () => {
    describe('Quando a função findOne faz uma busca com sucesso', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(userIfos as User);
      });

      after(() => {
        (User.findOne as sinon.SinonStub ).restore();
      });

      it('Deve efetuar o login com sucesso', async () => {
        const response = await chai.request(app).post('/login').send(userLogin);
        chai.expect(response.status).to.equal(200);
        chai.expect(response.body).to.have.property('token')
      });

      it('Deve retornar uma bad request se o password for informado errado', async () => {
        const response = await chai.request(app).post('/login').send(incorrectLogins[3]);
        chai.expect(response.status).to.equal(401);
        chai.expect(response.body).to.deep.equal({ message: incorrectDataMessage });
      });
    });

    describe('Quando a função findOne falha ao fazer uma busca', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
      });

      after(() => {
        (User.findOne as sinon.SinonStub ).restore();
      });

      it('Deve retornar uma bad request se o email não for informado', async () => {
        const response = await chai.request(app).post('/login').send(incorrectLogins[0]);
        chai.expect(response.status).to.equal(400);
        chai.expect(response.body).to.deep.equal({ message: fieldFillMessage });
      });

      it('Deve retornar uma bad request se o password não for informado', async () => {
        const response = await chai.request(app).post('/login').send(incorrectLogins[1]);
        chai.expect(response.status).to.equal(400);
        chai.expect(response.body).to.deep.equal({ message: fieldFillMessage });
      });

      it('Deve retornar uma bad request se o email for informado errado', async () => {
        const response = await chai.request(app).post('/login').send(incorrectLogins[2]);
        chai.expect(response.status).to.equal(401);
        chai.expect(response.body).to.deep.equal({ message: incorrectDataMessage });
      });
    });

    describe('Quando ocorre alguma falha no servidor', () => {
      before(() => {
        sinon.stub(User, 'findOne').throws(new Error(SERVER_ERROR))
      });

      after(() => {
        (User.findOne as sinon.SinonStub ).restore();
      });

      it('Deve retornar um erro', async () => {
        const response = await chai.request(app).post('/login').send(userLogin);
        chai.expect(response.status).to.equal(500);
        chai.expect(response.body).to.deep.equal({ message: SERVER_ERROR });
      })
    });
  });
});

describe('Rota /login/validate', () => {
  describe('GET', () => {
    describe('Quando é passado um token valido', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(userIfos as User);
      });
  
      after(() => {
        (User.findOne as sinon.SinonStub ).restore();
      });
  
      it('Deve retornar a role do usuario', async () => {
        const response = await chai.request(app).get('/login/validate').set('Authorization', mockToken);
        chai.expect(response.status).to.equal(200);
        chai.expect(response.body).to.deep.equal({ role: payload.role });
      });
    });

    describe('Quando é passado um token invalido', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(userIfos as User);
      });
  
      after(() => {
        (User.findOne as sinon.SinonStub ).restore();
      });
  
      it('Deve retornar a mensagem "Invalid token"', async () => {
        const response = await chai.request(app).get('/login/validate').set('Authorization', 'token123');
        chai.expect(response.status).to.equal(401);
        chai.expect(response.body).to.deep.equal({ message: invalidToken });
      });
    });

    describe('Quando não é passado um token', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(userIfos as User);
      });
  
      after(() => {
        (User.findOne as sinon.SinonStub ).restore();
      });
  
      it('Deve retornar a mensagem "Token not found"', async () => {
        const response = await chai.request(app).get('/login/validate')
        chai.expect(response.status).to.equal(401);
        chai.expect(response.body).to.deep.equal({ message: tokenNotFound });
      });
    });
  });
});
