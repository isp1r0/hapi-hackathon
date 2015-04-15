"use strict";

var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
	// "1079783008705725"
	"id": {type: String, index:  true}, 
    "from": {
        "id": String, 
        "name": String
    },
	"name": String, 
	"description": String, 
	"picture": String, 
	"embed_html": String, 
	"icon": String, 
	"source": String, 
	"created_time": Date, 
	"updated_time": Date
}, {
	id: false // do not override id field
});

module.exports = mongoose.model('Video', videoSchema);