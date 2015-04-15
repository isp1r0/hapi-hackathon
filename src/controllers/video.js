"use strict";

var Model = require('src/dao/video');
var Hapi = require('hapi');
var replyHelper = require('./reply');


(function (module) {


module.findById = function (request, reply) {
	Model.find(request.params, replyHelper.findOne(request, reply));
};

module.insert = function (request, reply) {
 	var newUser = Model(request.payload); // 	payload validated
	newUser.save(replyHelper.findOne(request, reply));
};

module.update = function (request, reply) {
	var newUser = Model(request.payload); // payload validated
	newUser.save(replyHelper.findOne(request, reply));
};

module.delete = function (request, reply) {
	Model.findByIdAndRemove(request.params.id, replyHelper.delete(request, reply));
};

module.findAll = function (request, reply) {
	var user = request.auth.credentials;
	console.log(user);
	if (!user || !user.facebook) {
		return	reply(' no associated facebook account');
	} 
	Model.find({'from.id': user.facebook.id}, replyHelper.find(request, reply));
};

})(module.exports);