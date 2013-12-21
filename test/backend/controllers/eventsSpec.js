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

  describe('#get', function () {
    it('respond with requested event', function (done) {
      request(app)
        .get('/api/events')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          var eventid = res.body[0]._id;
          request(app)
            .get('/api/events/' + eventid)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) {
                return done(err);
              }
              expect(res.body).toBeDefined();
              expect(res.body._id).toBeDefined();
              done();
            });
        });
    });

    it('respond with 404 on missing event', function (done) {
      request(app)
        .get('/api/events/123notfound')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
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