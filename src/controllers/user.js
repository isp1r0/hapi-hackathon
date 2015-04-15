"use strict";

var User = require('src/dao/user');
var Hapi = require('hapi');



(function (module) {


function replyDelete(request, reply) {
	return function(err) {
		if (err) {
			console.log(err);
			return reply().code(500);
		}
		reply().code(204);
	};
}


function replyFindOne(request, reply) {
	return function (err, data) {
		if (err) {
			console.log(err);
			return reply().code(500);
		}

		if (data[0]) {
			reply(data[0]).type('application/json');
		}
		else {
			reply().code(404);
		}
	};
}


var paginationLinks = require('src/util/pagination-links');
var li = require('li');

var _ = require('lodash');

function replyFind(request, reply) {
	return function (err, data) {
		if (err) {
			console.log(err);
			return reply().code(500);
		}
		reply(data).hold()
		.header('Total-Count', data.length)
		.send();
	};
}


module.findByUsername = function (request, reply) {
	User.find(request.params, replyFindOne(request, reply));
};

module.insert = function (request, reply) {
 	var newUser = User(request.payload); // 	payload validated
	console.log(newUser);
	newUser.save(replyFindOne(request, reply));
};

module.update = function (request, reply) {
	var newUser = User(request.payload); // payload validated
	console.log(newUser);
	newUser.save(replyFindOne(request, reply));
};

module.delete = function (request, reply) {
	User.findByIdAndRemove(request.params.id, replyDelete(request, reply));
};

module.findAll = function (request, reply) {
	User.find({}, replyFind(request, reply));
};

})(module.exports);