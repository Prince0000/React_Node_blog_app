const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    sDesc: String,
    fDesc: String,
    image: String,
    uploadId: String,
    UserId: String,
    likes: { type: Number, default: 0 },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
