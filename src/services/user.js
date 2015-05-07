"use strict";

(function (module) {


var User = require('src/models/user');
var FB = require('src/services/fb');
var _ = require('lodash');

module.facebookLoginDialog = function () {
  return FB.getLoginUrl({ scope: 'user_about_me,email,read_stream' });
};


function getPicture(provider, profile) {
  var picture;
  switch(provider) {
    case 'facebook':
      picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
      break;
    case 'twitter':
      picture = profile.raw.profile_image_url_https;
      break;
  }
  return picture;
}

function upsertElement(arr, provider, newElement) {
  var pos = -1;
  _.forEach(arr, function (s, i) {
    if (s.provider === provider) {
      pos = i;
    }
  });

  if (pos >= 0) {
    arr.set(pos, newElement);
  } else {
    arr.push(newElement);
  }
}

module.oauth = function (credentials, current_email) {
  var provider = credentials.provider;
  var profile = credentials.profile;
  var email = current_email || (profile.id + '@' + provider);
  var oauth = {
    provider: provider,
    token: credentials.token,
    secret: credentials.secret 
  };
  var social = {
    provider: provider,
    profile: profile
  };

  return User.findOne({'email': email}).then(function (user) {   

    if (!user) {
      user = User({
          email: email,
          profile: {
            name: profile.displayName,
            picture: getPicture(provider, profile)
          },
          social: [social],
          oauth: [oauth]
      });
    } else {
      upsertElement(user.social, provider, social);
      upsertElement(user.oauth, provider, oauth);
      
    }
    return user.save();
  }).then(function(user) {
    return user.public();
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


