var express = require('express');
var todo = express.Router();

/**
 * GET todo list page
 */
todo.get('/todo', function(req, res) {
    res.json({
        data: [
            "setup socket api.",
            "oAuth authentication.",
            "device status and commands to reboot device or start app.",
            "close garage door after car leave/enter.",
            "close garage door if left open for long.",
            "stop closing/open the door when interruption is send.",
            "hybrid app to open/close doors.",
            "add remote server for non wifi/remote communication.",
            "BDD/TDD.",
            "code refactoring.",
        ]
    });
});

module.exports = todo;