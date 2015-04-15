"use strict";

var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	_id: { type: String, required: true, index: { unique: true } },
  userId: { type: String, required: true, index: { unique: true } },
  description: { type: String, required: true}
});

/**
 * Helper method for validating user's password.
 */
taskSchema.statics.findByID = function (params, callback) {
	this.find({_id: params.taskId, userId: params.userId}, callback);
};

taskSchema.statics.findByUserID = function (params, callback) {
	this.find({userId: params.userId}, callback);
};

taskSchema.statics.updateDescription = function (params, callback) {
	this.findOneAndUpdate(
		{_id: params.taskId, userId: params.userId}, 
		{description: params.description}, 
		callback
	);

};

taskSchema.statics.insert = function (params, callback) {
	this.insert(
		{_id: params.taskId, userId: params.userId}, 
		{description: params.description}, 
		callback
	);
};

taskSchema.statics.delete = function (params, callback) {
	this.delete({_id: params.taskId, userId: params.userId}, callback);
};

module.exports = mongoose.model('Task', taskSchema);
