var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  url: String,
  text: String
});

mongoose.model('Event', EventSchema);