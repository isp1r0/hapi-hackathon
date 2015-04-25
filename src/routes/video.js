"use strict";

var Joi = require('joi');

var Crud = require('libs/routes/crud');

module.exports = function(server, options){
	server.route(Crud({
		prefix: '/videos', 
		controller: require('src/controllers/video'), 
		validator: require('src/validators/video'),
		auth: "session"
	}));
};
