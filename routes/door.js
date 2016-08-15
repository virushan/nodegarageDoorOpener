var express = require('express');
var door = express.Router();
var fs = require("fs");
var Promise = require('promise');
var piGPIO = require('pi-gpio');
var nodemailer = require('nodemailer');
var redis = require('redis');
var redisConfig = ('../app/config/redis');
var client = redis.createClient(redisConfig.port, redisConfig.host);

function sendNotification(config, subject, body){
    var transporter = nodemailer.createTransport({
        service: config.service,
        auth: config.auth
    });

    var mailOptions = {
        from: config.from,
        to: config.to,
        cc: config.cc,
        bcc: config.bcc,
        subject: subject,
        text: body,
        html: '<b>'+body+'</b>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

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

var notificationConfig = {};
getConfig('../app/config/notification.json').then(function(data){
    notificationConfig = data;
}).catch(function(){
    notificationConfig = {};
});

/**
 * GET all door status
 */
door.get('/:id', function(req, res) {
    client.hgetall("doors", function(err, object) {
        if(!err && object != null)
            doorStatus = object;
        res.status(200);
        res.json({data: doorStatus[req.params.id]});

    });
});

/**
 * PUT open all doors
 */
door.put('/open/:id', function(req, res){
    console.log(doorStatus);
    if(doorStatus[req.params.id] == "close") {
        piGPIO.open(gpioConfig.relayPins[req.params.id], "output", function (err) {
            console.log('open pin: ' + req.params.id);
            setTimeout(function () {
                piGPIO.write(gpioConfig.relayPins[req.params.id], 1, function () {
                    console.log('closing pin: ' + req.params.id);
                    piGPIO.close(gpioConfig.relayPins[req.params.id]);
                    doorStatus[req.params.id] = "open";
                    client.hmset("doors", doorStatus);
                    sendNotification(notificationConfig, "garage door "+req.params.id+" is opened", "Garage door "+req.params.id+" is opened");
                });
            }, gpioConfig.replayTimeout);
        });
        res.status(200);
        res.json({data: "door open in progress."});
    }else {
        res.status(200);
        res.json({data: "door is already open."});
    }
});

/**
 * PUT close all doors
 */
door.put('/close/:id', function(req, res){

    if(doorStatus[req.params.id] == "open") {
        piGPIO.open(gpioConfig.relayPins[req.params.id], "output", function (err) {
            console.log('open pin: ' + req.params.id);
            setTimeout(function () {
                piGPIO.write(gpioConfig.relayPins[req.params.id], 0, function () {
                    console.log('closing pin: ' + req.params.id);
                    piGPIO.close(gpioConfig.relayPins[req.params.id]);
                    doorStatus[req.params.id] = "close";
                    client.hmset("doors", doorStatus);
                    sendNotification(notificationConfig, "Garage door "+req.params.id+" is closed", "Garage door "+req.params.id+" is closed");
                });
            }, gpioConfig.replayTimeout);
        });
        res.status(200);
        res.json({data: "door close in progress."});
    }else {
        res.status(200);
        res.json({data: "door is already closed."});
    }
});

module.exports = door;