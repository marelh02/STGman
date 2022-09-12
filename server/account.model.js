const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//the id is represented by the mat
let Account = new Schema({
    _id:String,
    pwd:String
});

module.exports = mongoose.model('Account', Account);