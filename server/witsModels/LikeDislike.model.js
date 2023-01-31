const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LikeDislike = new Schema({
    userId:String,
    like:Boolean,
    
});

module.exports = mongoose.model('LikeDislike', LikeDislike);