'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  team1: {
    type: [String]
  },
  team2: {
    type: [String]
  },
  team1_score: Number,
  team2_score: Number,
  created: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Game', GameSchema);
