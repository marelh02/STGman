const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//the id is represented by the badge number
let Intern = new Schema({
    _id:String,
    fname:String,
    name:String,
    sex:String,
    cin:String,
    school:String,
    service:String,
    site:String,
    mentor:String,
    startDate:Date,
    duration:Number,
    endDate:Date
});

module.exports = mongoose.model('Intern', Intern);