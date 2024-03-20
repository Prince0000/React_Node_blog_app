const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Blog = require('../model/Blog');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.fieldname + path.extname(file.originalname));
    }
});

// Multer upload configuration
const upload = multer({
    storage: storage
}).single('file');

// Upload Endpoint
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ error: "Failed to upload file." });
        }

        try {
            const { title, sDesc, fullDescription, uploadId, UserId } = req.body;
            const blogUploadData = await Blog.create({
                title,
                sDesc,
                fDesc: fullDescription,
                image: req.file.filename,
                uploadId,
                UserId
            });
            res.json({ message: "Success", blogUploadData });
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: "Failed to upload blog post. Please try again later." });
        }
    });
});

// Update Endpoint
router.put('/:id', async (req, res) => {
    try {
        const { title, sDesc, fDesc } = req.body;
        const blogId = req.params.id;

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            title,
            sDesc,
            fDesc
        }, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog post not found." });
        }

        res.json({ message: "Blog post updated successfully", updatedBlog });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Failed to update blog post. Please try again later." });
    }
});

module.exports = router;
