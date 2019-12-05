// import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

process.env.NODE_ENV = 'test';

const { expect } = chai;
chai.use(chaiHttp);
describe('/api/v1/red-flags', () => {
  const user = {
    firstname: 'jasmin',
    lastname: 'jaja jaja',
    username: 'itsmejaja',
    email: 'jasmin@gmail.com',
    phoneNumber: '0721314151',
    password: 'Password12',
    re_password: 'Password12',
  };
  const redFlagpost = {
    title: 'hey i know you',
    comment: 'hhhhh we did talk together hell yes',
    type: 'red-flag',
    location: '-1.9497, 30.1007',
  };
  let userData;
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        userData = res.body.data;
        done();
      });
  });
  describe('POST /api/v1/red-flags', () => {
    let flag;
    it('User should be able to create red-flag when all require field do exist', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags/')
        .send(redFlagpost)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          flag = res.body.data;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('User should be able to update red-flag', (done) => {
      chai.request(server)
        .patch(`/api/v1/red-flags/${flag.id}`)
        .send({ comment: 'this post updated' })
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('User should be able to get single red-flag', (done) => {
      chai.request(server)
        .get(`/api/v1/red-flags/${flag.id}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('User should not be able to delete single red-flag when there is no token', (done) => {
      chai.request(server)
        .delete(`/api/v1/red-flags/${flag.id}`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.a.property('error');
          done();
        });
    });
    it('User should be able to delete single red-flag', (done) => {
      chai.request(server)
        .delete(`/api/v1/red-flags/${flag.id}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res).to.have.status(204);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  describe('GET /api/v1/red-flags', () => {
    it('User should be able to get all red-flag', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('User should not be able to get all red-flag if there is no token', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags/')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.a.property('error');
          done();
        });
    });
  });
});
