const express = require('express');
const router = express.Router();
const Blog = require('../model/Blog');

// Route to get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a specific blog by ID
router.get('/:id', async (req, res) => {
    try {
      const blog = await Blog.findOne({ uploadId: req.params.id });
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' , uploadId: req.params.id});
      }
      res.json(blog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
