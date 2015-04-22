"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new mongoose.Schema({
	// "1079783008705725"
	"user": {type: String},
	"id": {type: String, index:  true}, 
    "from": {
        "id": String, 
        "name": String
    },
	"name": String, 
	"message": String,
	"story": String,
	"link": String, 
	"icon": String, 
	"source": String, 
	"created_time": Date, 
	"updated_time": Date,
	likes: {
		data: [Schema.Types.Mixed]
	},
	shares: {
		count: Number
	}
}, {
	id: false // do not override id field
});

module.exports = mongoose.model('Video', videoSchema);