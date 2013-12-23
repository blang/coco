'use strict';
var request = require('supertest');
var app;

describe('Userhome Controller', function () {
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

  describe('#index', function () {
    it('should deny without cookie', function (done) {
      request(app)
        .get('/api/userhome')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).toBeDefined();
          done();
        });
    });

    it('should allow with valid cookie', function (done) {
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
          var cookie = res.headers['set-cookie'];
          request(app)
            .get('/api/userhome')
            .set('Accept', 'application/json')
            .set('cookie', cookie)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) {
                return done(err);
              }
              expect(res.body).toBeDefined();
              expect(res.body.username).toEqual('user');
              done();
            });
        });
    });
  });
});