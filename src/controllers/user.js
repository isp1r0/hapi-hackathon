"use strict";

var Model = require('src/dao/user');
var Hapi = require('hapi');
var replyHelper = require('./reply');


(function (module) {


module.findOne = function (request, reply) {
	Model.find(request.params, replyHelper.findOne(request, reply));
};

module.insert = function (request, reply) {
 	var newModel = Model(request.payload); // 	payload validated
	newModel.save(replyHelper.findOne(request, reply));
};

module.update = function (request, reply) {
	
};

module.delete = function (request, reply) {
	Model.findByIdAndRemove(request.params.id, replyHelper.delete(request, reply));
};

module.findAll = function (request, reply) {
	Model.find({}, replyHelper.find(request, reply));
};

})(module.exports);