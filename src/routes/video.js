"use strict";

var Joi = require('joi');

var Crud = require('libs/routes/crud');
var VideoController = require('src/controllers/video');

function authCookieRoute(options) {
	return {
		method: options.method || 'GET',
		path: options.path,
		config: {
			auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
			handler: options.handler,
			validator: options.validator
		}
	};
}

module.exports = function(server, options){
	server.route(Crud({
		prefix: '/videos', 
		controller: VideoController, 
		validator: require('src/validators/video'),
		auth: "session"
	}));
	server.route([
		authCookieRoute({
			path: '/video/facebook', 
			handler: VideoController.facebookMovies
		}),
		authCookieRoute({
			method: 'POST',
			path: '/video/facebook',
			handler: VideoController.pullFacebookMovies
		})
	]);
};
