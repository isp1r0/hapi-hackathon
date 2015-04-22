"use strict";

var constants = require('src/config/constants');

var mongoose = require('mongoose');
mongoose.connect(constants.database);
mongoose.connection.on('error', function(err) {
    console.error(err, constants.database); 
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});


var User = require('./src/dao/user');

// create a new user
var newUser = User({
  username: 'admin',
  password: '123456',
  admin: true
});

newUser.save(function(err) {
	console.log(err);
});