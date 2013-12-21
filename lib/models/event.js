'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  type: String,
  image: String,
  desc: String,
  server: String,
  modstring: String,
  island: String,
  creator: String,
  organizer: String,
  playerMin: Number,
  playerMax: Number,
  setupMedic: String,
  setupRespawn: String,
  setupLoadout: String,
  text: String
});

mongoose.model('Event', EventSchema);