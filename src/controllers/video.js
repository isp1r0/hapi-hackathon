"use strict";

var Video = require('src/models/video');
var _ = require('lodash');
var crud = require('libs/controllers/crud');
var replyHelper = require('libs/reply');

(function (module) {
	_.extend(module, crud(Video));

	module.findAll = function (request, reply) {
		var user = request.auth.credentials;
		console.log(user);
		if (!user || !user.facebook) {
			return	reply(' no associated facebook account');
		} 
		Video.find({'user': user.facebook.id}, replyHelper.find(request, reply));
	};

})(module.exports);