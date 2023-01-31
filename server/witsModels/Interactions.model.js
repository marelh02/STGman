const mongoose = require('mongoose');
const CommentModel = require('./Comment.model');
const LikeDislikeModel = require('./LikeDislike.model');
const Schema = mongoose.Schema;

let Interactions = new Schema({
    articleId:String,
    likes:[LikeDislikeModel.schema],
    comments:[CommentModel.schema]
    
});

module.exports = mongoose.model('Interactions', Interactions);