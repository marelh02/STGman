const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Comment = new Schema({
    userId:String,
    date:Date,
    text:String,
});

Comment.add({
    comments:[Comment]
 });

module.exports = mongoose.model('Comment', Comment);