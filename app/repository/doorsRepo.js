var redisConfig = require('../models/doors');
var Promise = require('promise');
var extend = require('extend');
var doors = redisConfig;
var collection = {};
module.exports = {
    get: function(){
        return new Promise(function(resolve, reject) {
            doors.hgetall("doors", function (err, doorsObj) {
                if(!err) resolve(doorsObj);
                else reject(null);
            });
        });
    },
    add: function (document) {
        extend(collection, document);
    },
    remove: function (document) {
        extend(collection, document);
    },
    sync: function () {
        return new Promise(function(resolve, reject){
            get().then(function(dbCollection){
                extend(dbCollection, collection);
                doors.hmset("doors", dbCollection);
                resolve(dbCollection);
            }).catch(function(err){
                console.log(err);
                reject("unable to update db");
            })

        });
    }
}

