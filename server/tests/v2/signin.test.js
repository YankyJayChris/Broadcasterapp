// import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

process.env.NODE_ENV = 'test';

const { expect } = chai;
chai.use(chaiHttp);
describe('POST /api/v1/auth/signin', () => {
  const user = {
    firstname: 'jasmin',
    lastname: 'jaja jaja',
    username: 'itsmejaja',
    email: 'jasmin@gmail.com',
    phoneNumber: '0721314151',
    password: 'Password12',
    re_password: 'Password12',
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end(() => {
        done();
      });
  });

  it('User should be able to loggin', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({ email: user.email, password: user.password })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.a.property('data');
        expect(res.body.message).to.equals('User is successfully logged in');
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('User should not be able to sign with wrong password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({ email: user.email, password: 'thisiswrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.a.property('error');
        done();
      });
  });
});
