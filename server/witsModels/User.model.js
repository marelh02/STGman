const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    fullName:String,
    email:{
        type: String,
        unique: true
      },
    password:String
});

module.exports = mongoose.model('User', User);
