// import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

process.env.NODE_ENV = 'test';

const { expect } = chai;
chai.use(chaiHttp);
describe('/api/v2/red-flags', () => {
  const user = {
    firstname: 'jasmin',
    lastname: 'jaja jaja',
    username: 'itsmejaja',
    email: 'jasmintest@gmail.com',
    phoneNumber: '0721314151',
    password: 'Password12',
    re_password: 'Password12',
  };
  let userData;
  before(async () => {
    try {
    // eslint-disable-next-line no-unused-vars
      const res = await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user);

      userData = res.body.data;
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
  describe('GET /api/v2/red-flags', () => {
    it('User should be able to get all red-flag', async () => {
      try {
        const res = await chai.request(server)
          .get('/api/v2/red-flags/')
          .set('x-access-token', userData.token);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should not be able to get all red-flag if there is no token', async () => {
      try {
        const res = await chai.request(server)
          .get('/api/v2/red-flags/');
        expect(res).to.have.status(403);
        expect(res.body).to.have.a.property('error');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
  });
});
