'use strict';

var Game = require('./game.model');
var config = require('../../config/environment');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of game
 */
exports.index = function(req, res) {
  Game.find({}, function (err, Games) {
    if(err) return res.status(500).send(err);
    res.status(200).json(Games);
  });
};

exports.gameHistory = function(req, res, next){
  Game.find().sort('-created').exec(function(err, Games) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(Games);
    }
  });
}

/**
 * Creates a new Game
 */
exports.create = function (req, res, next) {
  var newGame = new Game(req.body);
  newGame.save(function(err, Game) {
    if (err) return validationError(res, err);
    res.json(Game);
  });
};

/**
 * Get a single Game
 */
exports.show = function (req, res, next) {
  var GameId = req.params.id;

  Game.findById(GameId, function (err, Game) {
    if (err) return next(err);
    if (!Game) return res.status(401).send('Unauthorized');
    res.json(Game);
  });
};

/**
 * Deletes a Game
 */
exports.destroy = function(req, res) {
  Game.findByIdAndRemove(req.params.id, function(err, Game) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
