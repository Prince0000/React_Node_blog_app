const mongoose = require('mongoose');

const blogLikeSchema = new mongoose.Schema({
    uploadId: String,
    UserId: String,
    isLiked: Boolean
}, { timestamps: true });

const BlogLikes = mongoose.model('like', blogLikeSchema);

module.exports = BlogLikes;
