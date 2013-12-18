'use strict';
var config = require('../../config/config')('test');
require(config.root + '/config/models')(config);
var home = require('../../app/controllers/home');
//var expect = require('chai').expect;
describe('Home Controller', function () {
  beforeEach(function () {
    // ...
  });

  it('should export an index route', function () {
    expect(home.index).toBeDefined();
  });
});
