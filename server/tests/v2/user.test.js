// import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

process.env.NODE_ENV = 'test';

const { expect } = chai;
chai.use(chaiHttp);
describe('/api/v1/auth', () => {
  const user = {
    firstname: 'dizzo',
    lastname: 'did did',
    username: 'itsmejaja',
    email: 'dizzo@gmail.com',
    phoneNumber: '0721314151',
    password: 'Password12',
    re_password: 'Password12',
  };
  let authData;
  before(async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user);
      authData = res.body.data;
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('GET /api/v2/auth/ User should be able to get all users', async () => {
    try {
      const res = await chai.request(server)
        .get('/api/v2/auth/')
        .set('x-access-token', authData.token);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
  it('GET /api/v2/auth/ User should not be able to get all users if there is no token', async () => {
    try {
      const res = await chai.request(server)
        .get('/api/v2/auth/');
      expect(res).to.have.status(403);
      expect(res.body).to.have.a.property('error');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });

  it('GET /api/v2/auth/ User should be able to get single user', async () => {
    try {
      const res = await chai.request(server)
        .get(`/api/v2/auth/${authData.user.id}`)
        .set('x-access-token', authData.token);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
  it('PATCH /api/v2/auth/update User should be able to update their record', async () => {
    try {
      const res = await chai.request(server)
        .patch('/api/v2/auth/update')
        .set('x-access-token', authData.token)
        .attach('avatar', './server/public/upload/testimage.jpeg');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
  it('DELETE /api/v2/auth/ User should be able to delete single user', async () => {
    try {
      const res = await chai.request(server)
        .delete(`/api/v2/auth/${authData.user.id}`)
        .set('x-access-token', authData.token);
      expect(res).to.have.status(204);
      expect(res.body).to.be.an('object');
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
});
