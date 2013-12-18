'use strict';
var fs = require('fs');
module.exports = function (config) {
  var modelsPath = config.root + '/app/models';
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
      require(modelsPath + '/' + file);
    }
  });
};