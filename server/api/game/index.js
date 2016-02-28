'use strict';

var express = require('express');
var controller = require('./game.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.post('/', controller.create);
router.get('/history', auth.isAuthenticated(), controller.gameHistory);


module.exports = router;
