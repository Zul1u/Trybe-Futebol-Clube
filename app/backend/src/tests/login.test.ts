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



describe('/login', () => {
  describe('POST', () => {
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
  });
});
