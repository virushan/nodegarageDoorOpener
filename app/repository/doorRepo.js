var doorsModel = require('../models/doors');
var Promise = require('promise');
var extend = require('extend');
var doors = redisConfig;
var collection = {};


module.exports = {
    get: function (obj){
        return new Promise(function(resolve, reject) {
            doorsModel.get(obj, function (returnDoor) {
                resolve(returnDoor);
            });
        });
    },
    add: function (obj) {
    },
    remove: function (obj) {
    },
}