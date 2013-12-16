if(!(['test','development'].indexOf(process.env.NODE_ENV || 'development') > -1 )){
  console.error('Can\'t execute database preparation on non-development database, could be dangerous!');
  return;
}

var mongoose = require('mongoose'),
  fs = require('fs'),
  $q = require('q'),
  async = require('async'),
  config = require('./config/config');

// define fixtures order
var fixtures = [
  'events'
];

// Load models
var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

//connect to db
mongoose.connect(config.db);
console.log('using database: '+ config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

//prepare database before inserting fixtures
var dbprepared = $q.defer();
db.on('open', function(){
  console.log('open');
  mongoose.connection.db.dropDatabase(function(err){
    if(err){
      dbprepared.reject(err);
    }else{
      dbprepared.resolve();
    }
  });
});

//after db is prepared
dbprepared.promise.then(
  function(){
    console.log('Import fixtures');
    var fixturePath = __dirname + '/fixtures';

    //load fixtures in order
    async.eachSeries(fixtures,
      function(file, callback){
        console.log('- Fixture: ' + file);
        var fixture = require(fixturePath + '/' + file + '.js');
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
          console.log('Import finished successfully');
          process.exit(0);
        }else{
          console.error('An error occurred: '+ err);
          process.exit(1);
        }
        db.close();
      }
    );
  }, function(err){
    console.log('An error occurred while preparing the database: ' + (err.collection?' On Collection: "'+err.collection+'"':'') + (err.error?' With Error: '+err.error:''));
  }
);
