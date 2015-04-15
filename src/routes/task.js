"use strict";

var taskController = require('../controllers/task');
var taskValidate = require('../validate/task');

exports.register = function(server, options, next){
	server.route([
		{
			method: 'GET',
			path: '/tasks/{task_id}',
			config : {
				handler: taskController.findByID,
				validate: taskValidate.findByID
			}
		},
		{
			method: 'GET',
			path: '/tasks',
			config : {
				handler: taskController.find,
				validate : taskValidate.find
			}
		},
		{
			method: 'POST',
			path: '/tasks',
			config : {
				handler : taskController.insert,
				validate : taskValidate.insert
			}
		},
		{
			method: 'PUT',
			path: '/tasks/{task_id}',
			config : {
				handler: taskController.update,
				validate : taskValidate.update
			}
		},
		{
			method: 'DELETE',
			path: '/tasks/{task_id}',
			config : {
				handler: taskController.delete,
				validate : taskValidate.delete
			}
		}
	]);
	next();
};