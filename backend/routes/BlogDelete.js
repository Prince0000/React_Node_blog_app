const express = require('express');
const router = express.Router();
const Blog = require('../model/Blog');

// Route to delete a specific blog by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully', deletedBlog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
