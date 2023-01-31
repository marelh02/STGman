const mongoose = require('mongoose');
const BlockModel = require('./Block.model');
const Schema = mongoose.Schema;

let Article = new Schema({
    articleID:String,
    blocks:[BlockModel.schema]
});

module.exports = mongoose.model('Article', Article);