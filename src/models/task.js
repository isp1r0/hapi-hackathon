"use strict";

var _ = require('lodash');
var Joi = require('joi');

function TaskModel(){
	this.schema = {
		taskId: Joi.string().max(255),
		description: Joi.string().max(255)
	};
}

module.exports = TaskModel;