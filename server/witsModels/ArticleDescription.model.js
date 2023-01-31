const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArticleDescription = new Schema({
    id:String,
    writerId:String,
    writerFullName:String,
    creationDate:Number,
    coverImg:String,
    description:String,
    topics:[String],

});

module.exports = mongoose.model('ArticleDescription', ArticleDescription);
