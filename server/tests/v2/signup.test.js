// import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import userModel from '../../v2/models/User';

// eslint-disable-next-line no-unused-vars
const should = chai.should();

process.env.NODE_ENV = 'test';

const { expect } = chai;
chai.use(chaiHttp);
describe('POST /api/v2/auth/signup', () => {
  after((done) => {
    userModel.dropTable();
    done();
  });
  it('it should create a user when all field required exist', async () => {
    const user = {
      firstname: 'jasmin',
      lastname: 'jaja jaja',
      username: 'itsmejaja',
      email: 'jasmin23@gmail.com',
      phoneNumber: '0721314151',
      password: 'Password12',
      re_password: 'Password12',
    };
    try {
      const res = await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user);
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
  it('it should not create a user when all require field do not exist', async () => {
    const user = {
      firstname: 'chris',
      lastname: 'jay jay',
      email: 'chris@gmail.com',
      phoneNumber: '0721314151',
      password: 'Password12',
    };
    try {
      const res = await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user);
      expect(res).to.have.status(422);
      expect(res.body).to.have.a.property('error');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
});
