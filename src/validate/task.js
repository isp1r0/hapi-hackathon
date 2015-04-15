"use strict";

var _ = require('lodash');
var Joi = require('joi');

var models = require('src/models');

function TaskValidate(){}

TaskValidate.prototype = (function(){

	return {
		findByID: {
			params: (function path() {
				var taskSchema = new models.Task().schema;
				return {
					task_id : taskSchema.taskId.required()
				};
			})()
		},
		find : {
			query: (function query() {
				var taskSchema = new models.Task().schema;
				return {
					description : taskSchema.description
				};
			})()
		},
		insert: {
			payload: (function payload() {
				var taskSchema = new models.Task().schema;
				return {
					description : taskSchema.description.required()
				};
			})()
		},
		update: (function update() {
			var taskSchema = new models.Task().schema;
			return {
				params: {
					task_id : taskSchema.taskId.required()
				},
				payload: {
					description : taskSchema.description.required()
				}
			};
		})(),
		delete: {
			params: (function path() {
				var taskSchema = new models.Task().schema;
				return {
					task_id : taskSchema.taskId.required()
				};
			})()
		}
	};
})();

var taskValidate = new TaskValidate();
module.exports = taskValidate;