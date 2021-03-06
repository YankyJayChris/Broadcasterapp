// import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import userModel from '../../v2/models/User';
import redflagModel from '../../v2/models/RedFlag';

process.env.NODE_ENV = 'test';

const { expect } = chai;
chai.use(chaiHttp);
describe('POST /api/v2/auth/signin', () => {
  const user = {
    firstname: 'jasmin',
    lastname: 'jaja jaja',
    username: 'itsmejaja',
    email: 'jasmin@gmail.com',
    phoneNumber: '0721314151',
    password: 'Password12',
    re_password: 'Password12',
  };

  before(async () => {
    try {
      await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user);
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
  after(async () => {
    try {
      await redflagModel.dropTable();
      await userModel.dropTable();
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('User should be able to loggin', async () => {
    try {
      await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user);
      const res = await chai.request(server)
        .post('/api/v2/auth/signin')
        .send({ email: user.email, password: user.password });

      expect(res).to.have.status(200);
      expect(res.body).to.have.a.property('data');
      expect(res.body.message).to.equals('User is successfully logged in');
      expect(res.body).to.be.an('object');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
  it('User should not be able to sign with wrong password', async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v2/auth/signin')
        .send({ email: user.email, password: 'thisiswrongpassword' });
      expect(res).to.have.status(422);
      expect(res.body).to.have.a.property('error');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
});
