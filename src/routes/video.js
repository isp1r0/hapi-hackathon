"use strict";

var Joi = require('joi');

var Controller = require('src/controllers/video');

exports.register = function(server, options, next){
	server.route([
		{
			method: 'GET',
			path: '/videos/{id}',
			config: {
				handler: Controller.findById,
				validate: {
					params: {
						id: Joi.string().min(2).required()
					}
				}
			}
		},
		{
			method: 'GET',
			path: '/videos',
			config: {
				handler: Controller.findAll,
				auth: 'session'
			}
		},
		{
			method: 'POST',
			path: '/videos',			
			config: {
				payload: {
					parse: true,
					override: "application/json"
				},
				handler: Controller.insert
			}
		},
		{
			method: 'DELETE',
			path: '/videos/{id}',
			config: {
				handler: Controller.delete,
				validate: {
					params: {
						id: Joi.string().required()
					}
				}
			}
		}
	]);
	next();
};

exports.register.attributes = {
    name: 'video'
};