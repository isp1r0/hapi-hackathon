"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new mongoose.Schema({
	user_id: {type: String},
	id: {type: String, index: true}, 
	created_time: Date, 
	likes: Number,
	shares: Number
}, {
	id: false // do not override id field
});

videoSchema.index({ user_id: 1, id: 1}, { unique: true });

module.exports = mongoose.model('Video', videoSchema);