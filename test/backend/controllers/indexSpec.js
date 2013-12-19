'use strict';
var request = require('supertest');
var app;

describe('Index Controller', function () {
  beforeEach(function () {
    app = require('../../../server');
  });

  describe('#index', function () {
    it('respond on / with valid template', function (done) {
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res).toBeDefined();
          expect(res.text).toMatch(/cocoApp/);
          expect(res.headers['content-type']).toMatch(/utf.8/);
          done();
        });
    });

    it('respond on /index.html with valid template', function (done) {
      request(app)
        .get('/index.html')
        .expect(200)
        .expect('Content-Type', /html/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res).toBeDefined();
          expect(res.text).toMatch(/cocoApp/);
          expect(res.headers['content-type']).toMatch(/utf.8/);
          done();
        });
    });

    it('catch all requests with 404', function (done) {
      request(app)
        .get('/notfound')
        .expect(404)
        .expect('Content-Type', /html/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res).toBeDefined();
          done();
        });
    });
  });

  describe('#partials', function () {
    it('respond with valid partials', function (done) {
      request(app)
        .get('/partials/main.html')
        .expect(200)
        .expect('Content-Type', /html/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res).toBeDefined();
          expect(res.text).toMatch(/Boilerplate/);
          done();
        });
    });

    it('don\'t break for missing partials', function (done) {
      request(app)
        .get('/partials/notpossiblefound.html')
        .expect(404)
        .expect('Content-Type', /html/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res).toBeDefined();
          done();
        });
    });
  });
});