"use strict";

var Q = require('q');
var _ = require('lodash');
var Video = require('src/models/video');
var FB = require('src/services/fb');
var User = require('src/services/user');

(function (module) {
module.pullFacebookMovies = function (user_id) {
    return User.getFacebookAccessToken(user_id).then(function(access_token) {
        if (!access_token) {
            throw ('access_token not found user_id ' + user_id);
        }
        
        return FB.getHome(
            access_token, 
            'app_2392950137', 
            'shares,likes.limit(0).summary(true)'
        );
    }).then(function (res) {
        if (res.error) {
            throw res.error;
        }
    	var promises = _.map(res.data, function (video) {
    		return Video.create({
                id: video.id,
    			user_id: user_id,
    			created_time: video.created_time,
    			shares: (video.shares)? video.shares.count : 0,
    			likes: (video.likes && video.likes.summary)? video.likes.summary.total_count : 0
    		});
    	});
    	return Q.all(promises);
    });
};

module.readFacebookMovies = function (user_id) {
    return Video.find({user_id: user_id});
};

})(module.exports);

