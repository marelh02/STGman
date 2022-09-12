const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//the id is represented by the service code, the site is represented by the site code
let ServiceOCP = new Schema({
    _id:String,
    name:String,
    site:String,
    chef:String
});

module.exports = mongoose.model('ServiceOCP', ServiceOCP);