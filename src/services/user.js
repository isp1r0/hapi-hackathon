"use strict";

var User = require('src/models/user');
var FB = require('src/services/fb');

(function (module) {
module.facebookLoginDialog = function () {
  return FB.getLoginUrl({ scope: 'user_about_me,email,read_stream' });
};

var LoginFB = function (profile, access_token, cb) {
  return User.findOne({'email': profile.email}).then(function (user) {    
    if (!user) {
      user = User({
          email: profile.email,
          access_token: {
            facebook: access_token
          },
          profile: {
            name: profile.name,
            gender: profile.gender,
            picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
            facebook: profile
          }          
      });
    } else {
      user.access_token.facebook = access_token;
    }
    return user.save();
  }).then(function(user) {
    return {
      _id: user._id,
      email: user.email,
      profile: user.profile
    };
  });
};

module.authFacebook = function (code) {
  return FB.getProfile(code).then(function (res) {
    console.log(res);
    return LoginFB(res.profile, res.access_token);
  });
};


module.getFacebookAccessToken = function (user_id) {
    return User.findOne(
      {'profile.facebook.id': user_id}, 
      {'access_token.facebook': 1}
    ).then(function (res) {
      if (res) {
        return res.access_token.facebook;
      }      
    });
};

})(module.exports);


