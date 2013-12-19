'use strict';
var config = require('../../../lib/config/config')('test');
require(config.root + '/lib/config/models')(config);
var home = require(config.root + '/lib/controllers/home');

describe('Home Controller', function () {
  it('should export an index route', function () {
    expect(home.index).toBeDefined();
  });
});
