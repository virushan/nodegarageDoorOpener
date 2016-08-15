var express = require('express');
var api = express.Router();

/**
 * GET api page
 */
api.get('/', function(req, res) {
    res.json({
        /*TODO this information come from mongo db */
        data: [
            {
                url: "/",
                method: "GET",
                description: "app information.",
            },
            {
                url: "/api",
                method: "GET",
                description: "api reference.",
            },
            {
                url: "/api/todo",
                method: "GET",
                description: "todo list.",
            },
            {
                url: "/api/config/gpio",
                method: "GET",
                authentication: 'bearer',
                description: "gpio information.",
            },
            {
                url: "/api/config/notification",
                method: "GET|PUT",
                authentication: 'bearer',
                put: "{data: obj}",
                description: "email notification configuration.",
            },
            {
                url: "/api/system",
                method: "GET|PUT",
                authentication: 'bearer',
                put: "{command: 'reboot|reset'}",
                description: "device information. app soft restart or system reboot.",
            },
            {
                url: "/api/doors",
                method: "GET|PUT",
                put: "{state: 'open|close'}",
                authentication: 'bearer',
                description: "get all door status information or put call to open\\close doors.",
            },
            {
                url: "/api/doors/history",
                method: "GET",
                authentication: 'bearer',
                description: "get all door history.",
            },
            {
                url: "/api/door/{id}",
                method: "GET|PUT",
                put: "{state: 'open|close'}",
                authentication: 'bearer',
                description: "get door status information or put call to open\\close door.",
            },
            {
                url: "/api/door/{id}/history",
                method: "GET",
                authentication: 'bearer',
                description: "door access history.",
            }
        ]
    });
});

module.exports = api;