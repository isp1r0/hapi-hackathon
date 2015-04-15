"use strict";

var User = require('src/dao/user');
var Hapi = require('hapi');
var replyHelper = require('./reply');


(function (module) {


module.findByEmail = function (request, reply) {
	User.find(request.params, replyHelper.findOne(request, reply));
};

module.insert = function (request, reply) {
 	var newUser = User(request.payload); // 	payload validated
	console.log(newUser);
	newUser.save(replyHelper.findOne(request, reply));
};

module.update = function (request, reply) {
	var newUser = User(request.payload); // payload validated
	console.log(newUser);
	newUser.save(replyHelper.findOne(request, reply));
};

module.delete = function (request, reply) {
	User.findByIdAndRemove(request.params.id, replyHelper.delete(request, reply));
};

module.findAll = function (request, reply) {
	User.find({}, replyHelper.find(request, reply));
};

})(module.exports);