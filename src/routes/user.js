"use strict";

var Joi = require('joi');

var userController = require('src/controllers/user');
exports.register = function(server, options, next){
	server.route([
		{
			method: 'GET',
			path: '/users/{username}',
			config: {
				handler: userController.findByUsername,
				validate: {
					params: {
						username: Joi.string().min(2).required()
					}
				}
			}
		},
		{
			method: 'GET',
			path: '/users',
			config: {
				handler: userController.findAll
			}
		},
		{
			method: 'POST',
			path: '/users',			
			config: {
				payload: {
					parse: true,
					override: "application/json"
				},
				handler: userController.insert,
				validate: { 
			        payload: { 
			            username: Joi.string().min(2).required(), 
			           	password: Joi.string().min(2).required()
			    	}
			   	}
			}
		},
		{
			method: 'DELETE',
			path: '/users/{id}',
			config: {
				handler: userController.delete,
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
    name: 'user'
};