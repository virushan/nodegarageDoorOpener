var express = require('express');
var home = express.Router();

/**
 * GET Home page
 */
home.get('/', function(req, res) {
    res.json({  /*TODO this information come from Mongo */
		data: {
			name: "WiFi/Remote Garage Door Opener",
			version: "1.0.0-beta",
			owner: "Virushan Maheswaran",
			licencing: "ISC",
		}
    });
});

module.exports = home;
