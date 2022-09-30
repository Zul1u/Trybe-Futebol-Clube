import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/User';
import { after, before } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

const userIfos = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

const userLogin = {
  email: 'user@user.com',
  password: 'secret_user'
}

const incorrectLogins = [
  { password: 'secret_user' },
  { email: 'user@user.com', },
  { email: 'iuser@iuser.com', password: 'secret_user' },
  { email: 'user@user.com', password: 'secret_use' }
];

const fieldFillMessage = 'All fields must be filled';
const incorrectDataMessage = 'Incorrect email or password';

describe('/login', () => {
  describe('POST', () => {
    describe('Quando a função findOne faz uma busca com sucesso', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(userIfos as User);
      });

      after(() => {
        sinon.restore();
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
        sinon.restore();
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
        sinon.stub(User, 'findOne').throws(new Error('Algo deu errado!!'))
      });

      after(() => {
        sinon.restore();
      });

      it('Deve retornar um erro', async () => {
        const response = await chai.request(app).post('/login').send(userLogin);
        chai.expect(response.status).to.equal(500);
        chai.expect(response.body).to.deep.equal({ message: 'Algo deu errado!!' });
      })
    });
  });
});
