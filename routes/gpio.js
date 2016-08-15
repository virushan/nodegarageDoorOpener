var express = require('express');
var gpio = express.Router();
var fs = require("fs");


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


/**
 * GET todo list page
 */
gpio.get('/gpio', function(req, res) {
    var gpioConfig = getConfig('../app/config/gpio.json');
    res.status(200);
    res.json({data: gpioConfig});
});

module.exports = gpio;