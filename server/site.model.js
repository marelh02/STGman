const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//the id is represented by the site code
let SiteOCP = new Schema({
    _id:String,
    name:String,
    chef:String
});

module.exports = mongoose.model('SiteOCP', SiteOCP);