const express = require('express');
const router = express.Router();
const Blog = require('../model/Blog');
const BlogLikes = require('../model/BlogLikes');

// Update Endpoint
router.put('/:id/:userId', async (req, res) => {
    try {
        const { likes } = req.body;

        // Validate likes
        if (typeof likes !== 'number') {
            return res.status(400).json({ error: "Likes must be a number." });
        }

        const blogId = req.params.id;
        const userId = req.params.userId;

        // Fetch the previous like count
        const Prevlike = await Blog.findById(blogId);
        if (!Prevlike) {
            return res.status(404).json({ error: "Blog post not found." });
        }
        const prevLikeCount = Prevlike.likes;

        // Check if the new like count is greater than the previous one
        const isLiked = prevLikeCount < likes;

        // Update BlogLikes collection
        const blogData = await BlogLikes.findOne({ uploadId: Prevlike.uploadId ,UserId: userId});
        if (blogData) {
            await BlogLikes.findByIdAndUpdate(blogData._id, { isLiked });
        } else {
            await BlogLikes.create({ uploadId: Prevlike.uploadId, UserId: userId, isLiked });
        }

        // Update the like count in the Blog collection
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { likes }, { new: true });

        res.json({ message: "Blog post updated successfully", updatedBlog, isLiked });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update blog post. Please try again later." });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { UserId,uploadId } = req.body; 
        // Find likes data for the user
        const likesDataStatus = await BlogLikes.findOne({ UserId,uploadId });

        if (!likesDataStatus) {
            return res.status(200).json({ message: 'Likes data not found for the user.', isLiked: false });
        }

        res.json(likesDataStatus);
    } catch (err) {
        console.error('Error finding likes data:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


module.exports = router;
