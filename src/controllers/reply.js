'use strict';


var paginationLinks = require('src/util/pagination-links');
var li = require('li');

var _ = require('lodash');

(function(module) {

module.delete = function (request, reply) {
	return function(err) {
		if (err) {
			console.log(err);
			return reply().code(500);
		}
		reply().code(204);
	};
};


module.findOne = function (request, reply) {
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
};

module.find = function (request, reply) {
	return function (err, data) {
		if (err) {
			console.log(err);
			return reply().code(500);
		}
		reply(data).hold()
		.header('Total-Count', data.length)
		.send();
	};
};

})(module.exports);