"use strict";

var Video = require('src/models/video');
var VideoService = require('src/services/video');

var _ = require('lodash');
var crud = require('libs/controllers/crud');
var replyHelper = require('libs/reply');

(function (module) {
	_.extend(module, crud(Video));

module.findAll = function (request, reply) {
	var user_id = getFacebookId(request.auth.credentials);
	if (!user_id) {
		return reply({
			error: 'Your account has not linked to facebook'
		});
	}
	
	VideoService.readFacebookMovies(user_id).then(
		replyHelper.fulfilled(reply), 
		replyHelper.rejected(reply)
	);
};

module.facebookMovies = function (request, reply) {
	var user_id = getFacebookId(request.auth.credentials);
	if (!user_id) {
		return reply.view('video', {
			title: 'Your account has not linked to facebook'
		});
	}

	return VideoService.readFacebookMovies(user_id).then(function (videos) {
		reply.view('video', {
			title: 'facebook',
			videos: videos
		});
	});
};

function getFacebookId(user) {
	if (user && user.profile && user.profile.facebook) {
		return user.profile.facebook.id;
	}
}

module.pullFacebookMovies = function (request, reply) {	
	var user_id = getFacebookId(request.auth.credentials);
	if (!user_id) {
		return reply.view('video', {
			title: 'Facebook',
			message: 'Your account has not linked to facebook'
		});
	}
	
	VideoService.pullFacebookMovies(user_id).done(
		function (videos) {
			reply.view('video', {
				title: 'Facebook',
				videos: videos
			});
		}, 
		function (error) {
			console.log(error);
			reply.view('video', {
				title: 'Facebook',
				message: error
			});
		}
	);
};

})(module.exports);