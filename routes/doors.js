var express = require('express');
var doors = express.Router();
var fs = require("fs");
var Promise = require('promise');
var piGPIO = require('pi-gpio');
var redis = require('redis');
var redisConfig = require('../app/config/redis');
var client = redis.createClient(redisConfig.port, redisConfig.host);

function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, encoding, function(err, data){
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });

    });
}

function getConfig(file){
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

var doorStatus = {};
var gpioConfig = {};
getConfig('../app/config/gpio.json').then(function(data){
    gpioConfig = data;
    client.hgetall("doors", function(err, object) {
        if(!err && object != null) doorStatus = object;
        else
            gpioConfig.relayPins.forEach(function(pin, index){
                doorStatus[index] = "close";
                client.hmset("doors", doorStatus);
            });
    });

}).catch(function(){
    doorStatus = {};
});

/**
 * GET all door status
 */
doors.get('/', function(req, res) {

    client.hgetall("doors", function(err, object) {
        if(!err && object != null)
            doorStatus = object;
            res.status(200);
            res.json({data: doorStatus});

    });

});

/**
 * PUT open all doors
 */
doors.put('/open', function(req, res){
    gpioConfig.relayPins.forEach(function(pin, index){
        if(doorStatus[index] == "close") {
            piGPIO.open(pin, "output", function (err) {
                console.log('open pin: ' + index);
                setTimeout(function () {
                    piGPIO.write(pin, 1, function () {
                        console.log('closing pin: ' + index);
                        piGPIO.close(pin);
                        doorStatus[index] = "open";
                        client.hmset("doors", doorStatus);
                    });
                }, gpioConfig.replayTimeout);
            });
        }
    });
    res.status(200);
    res.json({data: "doors open in progress"});
});

/**
 * PUT close all doors
 */
doors.put('/close', function(req, res){
    gpioConfig.relayPins.forEach(function(pin, index){
        if(doorStatus[index] == "open") {
            piGPIO.open(pin, "output", function (err) {
                console.log('open pin: ' + index);
                setTimeout(function () {
                    piGPIO.write(pin, 0, function () {
                        console.log('closing pin: ' + index);
                        piGPIO.close(pin);
                        doorStatus[index] = "close";
                        client.hmset("doors", doorStatus);
                    });
                }, gpioConfig.replayTimeout);
            });
        }
    });
    res.status(200);
    res.json({data: "doors close in progress"});
});

module.exports = doors;