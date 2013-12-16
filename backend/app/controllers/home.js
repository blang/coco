var mongoose = require('mongoose'),
  Event = mongoose.model('Event');

exports.index = function(req, res){
  Event.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('home/index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};