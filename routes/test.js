var express = require('express');
var test = express.Router();
var doorsController = require('../app/controllers/doors');

/**
 * GET api page
 */
test.get('/', doorsController.index);
test.get('/:id', doorsController.show);
test.put('/:id', doorsController.update);

module.exports = test;