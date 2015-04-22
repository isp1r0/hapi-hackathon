"use strict";

var Joi = require('joi');

var Controller = require('src/controllers/user');

exports.register = function(server, options, next){
	server.route([
		{
			method: 'GET',
			path: '/users/{id}',
			config: {
				handler: Controller.findOne,
				validate: {
					params: {
						id: Joi.string().min(2).required()
					}
				}
			}
		},
		{
			method: 'GET',
			path: '/users',
			config: {
				handler: Controller.findAll
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
				handler: Controller.insert,
				validate: { 
			        payload: { 
			            email: Joi.string().min(2).required(), 
			           	password: Joi.string().min(2).required()
			    	}
			   	}
			}
		},
		{
			method: 'DELETE',
			path: '/users/{id}',
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
    name: 'user'
};