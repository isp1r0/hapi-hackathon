
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.on('error', function() {
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