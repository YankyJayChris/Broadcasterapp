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
    email: 'jasmin@gmail.com',
    phoneNumber: '0721314151',
    password: 'Password12',
    re_password: 'Password12',
  };
  const usertest = {
    firstname: 'jasmin',
    lastname: 'jaja jaja',
    username: 'meandme',
    email: 'meandme@gmail.com',
    phoneNumber: '0721314445',
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
  let myuser;
  before(async () => {
    try {
      const res = await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user);
      const ress = await chai.request(server)
        .post('/api/v2/auth/signup')
        .send(usertest);

      userData = res.body.data;
      myuser = ress.body.data;
    } catch (err) {
      (() => { throw err; }).should.throw();
    }
  });
  describe('POST /api/v2/red-flags', () => {
    let flag;
    it('User should be able to create red-flag when all require field do exist', async () => {
      try {
        const res = await chai.request(server)
          .post('/api/v2/red-flags/')
          .send(redFlagpost)
          .set('x-access-token', userData.token);
        flag = res.body.data;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should not be able to create red-flag when there is no token', async () => {
      try {
        const res = await chai.request(server)
          .post('/api/v2/red-flags/')
          .send(redFlagpost);
        expect(res).to.have.status(403);
        expect(res.body).to.have.a.property('error');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should be able to update red-flag', async () => {
      try {
        const res = await chai.request(server)
          .patch(`/api/v2/red-flags/${flag.id}`)
          .send({ comment: 'this post updated' })
          .set('x-access-token', userData.token);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should be able to update red-flag', async () => {
      try {
        const res = await chai.request(server)
          .patch(`/api/v2/red-flags/${flag.id}`)
          .send({ comment: 'this post updated' })
          .set('x-access-token', myuser.token);
        expect(res).to.have.status(401);
        expect(res.body).to.have.a.property('error');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should not be able to update red-flag wrong post id', async () => {
      try {
        const res = await chai.request(server)
          .patch('/api/v2/red-flags/gvgvcgcfdctyvgvytctvg')
          .send({ comment: 'this post updated' })
          .set('x-access-token', userData.token);
        expect(res).to.have.status(422);
        expect(res.body).to.have.a.property('error');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should not be able to update red-flag status if his not admin', async () => {
      try {
        const res = await chai.request(server)
          .patch(`/api/v2/red-flags/status/${flag.id}`)
          .send({ status: 'rejected' })
          .set('x-access-token', userData.token);
        expect(res).to.have.status(422);
        expect(res.body).to.have.a.property('error');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should be able to get single red-flag', async () => {
      try {
        const res = await chai.request(server)
          .get(`/api/v2/red-flags/${flag.id}`)
          .set('x-access-token', userData.token);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('data');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should not be able to get single red-flag', async () => {
      try {
        const res = await chai.request(server)
          .get('/api/v2/red-flags/1234567889990000')
          .set('x-access-token', userData.token);
        expect(res).to.have.status(422);
        expect(res.body).to.have.a.property('error');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should not be able to delete single red-flag when there is no token', async () => {
      try {
        const res = await chai.request(server)
          .delete(`/api/v2/red-flags/${flag.id}`);
        expect(res).to.have.status(403);
        expect(res.body).to.have.a.property('error');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should not be able to delete red-flag if is not his', async () => {
      try {
        const res = await chai.request(server)
          .delete(`/api/v2/red-flags/${flag.id}`)
          .set('x-access-token', myuser.token);
        expect(res).to.have.status(401);
        expect(res.body).to.have.a.property('error');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should not be able to delete single red-flag when the id doesnt exist', async () => {
      try {
        const res = await chai.request(server)
          .delete('/api/v2/red-flags/adasdasdsafasdvcvxzx')
          .set('x-access-token', userData.token);
        expect(res).to.have.status(422);
        expect(res.body).to.have.a.property('error');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
    it('User should be able to delete single red-flag', async () => {
      try {
        const res = await chai.request(server)
          .delete(`/api/v2/red-flags/${flag.id}`)
          .set('x-access-token', userData.token);
        expect(res).to.have.status(204);
        expect(res.body).to.be.an('object');
      } catch (err) {
        (() => { throw err; }).should.throw();
      }
    });
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
