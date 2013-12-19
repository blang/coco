'use strict';
var request = require('supertest');
var util = require('util');
var app;

describe('Event Controller', function () {
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
    it('respond with list of events', function (done) {
      request(app)
        .get('/api/events')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).toBeDefined();
          expect(util.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
          done();
        });
    });
  });
});