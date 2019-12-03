// import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

process.env.NODE_ENV = 'test';

const { expect } = chai;
chai.use(chaiHttp);
describe('POST /api/v1/auth/signup', () => {
  it('it should create a user when all field required exist', (done) => {
    const user = {
      firstname: 'chris',
      lastname: 'jay jay',
      username: 'itsmejay',
      email: 'chris@gmail.com',
      phoneNumber: '0721314151',
      password: 'Password12',
      re_password: 'Password12',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('it should not create a user when all require field do not exist', (done) => {
    const user = {
      firstname: 'chris',
      lastname: 'jay jay',
      email: 'chris@gmail.com',
      phoneNumber: '0721314151',
      password: 'Password12',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.a.property('error');
        done();
      });
  });
});
