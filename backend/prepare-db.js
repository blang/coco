if (!module.parent) {
  console.error('Can\'t execute as standalone!');
  process.exit(1);
}

var mongoose = require('mongoose'),
  fs = require('fs'),
  $q = require('q'),
  async = require('async'),
  config = require('./config/config')(process.env.NODE_ENV);


if(!(['test','development'].indexOf(process.env.NODE_ENV || 'development') > -1 )){
  console.error('Can\'t execute database preparation on non-development database, could be dangerous!');
  return;
}

// define fixtures order
var fixtures = [
  'events'
];

module.exports.initStandalone = function(){
  var initdone = $q.defer();

  // Load models
  var modelsPath = __dirname + '/app/models';
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
      require(modelsPath + '/' + file);
    }
  });

  //connect to db
  mongoose.connect(config.db, config.dbconfig);
  //debug console.log('using database: '+ config.db);
  mongoose.connection.on('error', function (err) {
    initdone.reject();
    throw new Error('unable to connect to database at ' + config.db);
  });

  mongoose.connection.on('open', function(){
    initdone.resolve();
  });
  return initdone.promise;
};
module.exports.preparedb = function(){
  //mongoose.connect(config.db, config.dbconfig);
  //prepare database before inserting fixtures
  var dbcleared = $q.defer();
  mongoose.connection.db.dropDatabase(function(err){
    if(err){
      dbcleared.reject(err);
    }else{
      dbcleared.resolve();
    }
  });

  var dbprepared = $q.defer();

  //after db is prepared
  dbcleared.promise.then(
    function(){
      //console.log('Import fixtures');
      var fixturePath = __dirname + '/fixtures';

      //load fixtures in order
      async.eachSeries(fixtures,
        function(file, callback){
          //console.log('- Fixture: ' + file);
          var fixture = require(fixturePath + '/' + file + '.js')();
          if(!('then' in fixture)){
            callback('Fixture made no promise: ' + file);
          }else{
            fixture.then(
              function(){
                callback()
              }, function(error){
                callback('"' + error + '" on fixture: ' + file);
              }
            );
          }
        }, function(err){
          if(!err){
            //console.log('Import finished successfully');
            dbprepared.resolve();
          }else{
            //console.error('An error occurred: '+ err);
            dbprepared.reject(err);
          }
          db.close();
        }
      );
    }, function(err){
      console.log('An error occurred while preparing the database: ' + (err.collection?' On Collection: "'+err.collection+'"':'') + (err.error?' With Error: '+err.error:''));
      console.log(err);
    }
  );

  return dbprepared.promise;
};
