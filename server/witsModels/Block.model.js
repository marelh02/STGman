const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Block = new Schema({
    id:String,
    type:String,
    data:String,
});

module.exports = mongoose.model('Block', Block);