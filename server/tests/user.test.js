// import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

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
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        authData = res.body.data;
        done();
      });
  });

  it('GET /api/v1/auth/ User should be able to get all users', (done) => {
    chai.request(server)
      .get('/api/v1/auth/')
      .set('x-access-token', authData.token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('GET /api/v1/auth/ User should not be able to get all users if there is no token', (done) => {
    chai.request(server)
      .get('/api/v1/auth/')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.a.property('error');
        done();
      });
  });

  it('GET /api/v1/auth/ User should be able to get single user', (done) => {
    chai.request(server)
      .get(`/api/v1/auth/${authData.user.id}`)
      .set('x-access-token', authData.token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('PATCH /api/v1/auth/update User should be able to update their record', (done) => {
    chai.request(server)
      .patch('/api/v1/auth/update')
      .set('x-access-token', authData.token)
      .attach('avatar', './server/public/upload/testimage.jpeg')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('DELETE /api/v1/auth/ User should be able to delete single user', (done) => {
    chai.request(server)
      .delete(`/api/v1/auth/${authData.user.id}`)
      .set('x-access-token', authData.token)
      .end((err, res) => {
        expect(res).to.have.status(204);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
