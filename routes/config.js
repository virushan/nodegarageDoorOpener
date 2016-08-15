var express = require('express');
var config = express.Router();
var fs = require("fs");
var extend = require('extend');
var Promise = require('promise');


function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

function writeJsonFileSync(file, fileData, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    return new Promise(function (resolve, reject) {
        fs.writeFile(file, JSON.stringify(fileData, undefined, 2), encoding, function (err, res) {
            if (err) reject(err);
            else resolve(res);
        });
    });
}

function setConfig(file, data) {
    var filepath = __dirname + '/' + file;
    return writeJsonFileSync(filepath, data);
}

/**
 * GET notification configuration
 */
config.get('/notification', function(req, res) {
    var notification = getConfig('../app/config/notification.json');
    notification.auth.pass = "XXXXXX";
    res.status(200);
    res.json({data: notification});
});

/**
 * PUT update notification configuration
 */
config.put('/notification', function(req, res){
    var notification = getConfig('../app/config/notification.json');
    extend(notification, req.body.data);
    setConfig('../app/config/notification.json', notification).then(function(){
        notification.auth.pass = "XXXXXX";
        res.status(200);
        res.json({data: notification});
    }).catch(function(err){
        res.status(500);
        res.json({error: { status: 500, msg:"unable to save configuration at the moment"}});
    });
});

module.exports = config;