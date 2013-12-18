'use strict';
var request = require('supertest');
var util = require('util');
var app;
describe('Event Controller', function () {
  beforeEach(function () {
    app = require('../../app');
  });
  beforeEach(function (done) {
    app.settings.dbready.then(function () {
      require('../../prepare-db').preparedb().then(done, done);
    });
  });

  describe('#index', function () {
    it('respond with list of events', function (done) {
      expect(true).toBe(true);
      request(app)
        .get('/events')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body).toBeDefined();
          expect(util.isArray(res.body)).toBe(true);
          expect(res.body.length).toEqual(1);
          done();
        });
    });
  });
});