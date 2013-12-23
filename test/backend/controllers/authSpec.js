'use strict';
var request = require('supertest');
var app;

describe('Auth Controller', function () {
  beforeEach(function () {
    app = require('../../../server');
  });
  beforeEach(function (done) {
    app.settings.dbready.then(function () {
      require('../../../lib/prepare-db').preparedb().then(
        function () {
          done();
        }, done);
    });
  });

  describe('#login', function () {
    it('should login test user', function (done) {
      request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({username: 'user', password: 'user'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.headers['set-cookie']).toBeDefined();
          expect(res.body).toBeDefined();
          expect(res.body.success).toBe(true);
          done();
        });
    });

    it('should not login invalid user', function (done) {
      request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({username: 'anotheruser', password: 'user'})
        .expect('Content-Type', /json/)
        .expect(403)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).toBeDefined();
          done();
        });
    });

    it('should not login valid user with wrong password', function (done) {
      request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({username: 'user', password: 'wrong pass'})
        .expect('Content-Type', /json/)
        .expect(403)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).toBeDefined();
          done();
        });
    });

    it('should handle empty request', function (done) {
      request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).toBeDefined();
          done();
        });
    });

    it('should handle wrong request', function (done) {
      request(app)
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({username: 'user'})
        .expect('Content-Type', /json/)
        .expect(403)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).toBeDefined();
          done();
        });
    });
  });
});