"use strict";
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {type: String, unique: true},
  password: String,

  facebook: {
    name: String,
    id: String,
    access_token: String
  }
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
  	return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
    	return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
      	return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
    	return cb(err);
    }
    cb(null, isMatch);
  });
};

var Joi = require('joi');
userSchema.statics.login = function (params, cb) {

  var schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
  });


  var result = Joi.validate(params, schema, {allowUnknown:true});
  if (result.error) {
      return cb(null, "username and password must not be empty");
  }

  var credentials = result.value;

  var username = credentials.username.toLowerCase();
  var password = credentials.password;

  this.findOne({username: username}, function(err, user) {
    if (err) {
      return cb(err);
    }
    if (!user) {
      return cb(null, 'username ' + username + ' not found');
    }

    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return cb(null, null, user);
      } else {
        return cb(null, 'wrong password for ' + username);
      }
    });
  });
};

module.exports = mongoose.model('User', userSchema);
