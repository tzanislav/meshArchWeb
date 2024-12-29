const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blog'); // Import the Blog model
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const upload = multer(); // Multer configuration for handling file uploads
const s3 = new S3Client({ region: process.env.AWS_REGION });

// Routes

// Create a new blog
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Upload image to S3
        const file = req.file; // Single file from 'image' field
        if (!file) return res.status(400).send('No image file provided.');

        const fileName = `blog_${Date.now()}-${file.originalname}`;
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        console.log('Image uploaded to S3:', imageUrl);

        // Save blog post with image URL
        const { title, content, author, source } = req.body; // Extract form data
        const newBlog = new Blog({
            title,
            content,
            author,
            source,
            image: imageUrl, // Save S3 URL in the database
        });

        const savedBlog = await newBlog.save();
        console.log('Blog saved:', savedBlog);

        res.status(201).json(savedBlog);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
});

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        console.log("Got blogs");
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update a blog
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        let { title, content, author, source } = req.body; // Parse fields from req.body
        let image = req.body.image; // Handle image URL if passed

        console.log("Updating Title: " + title);
        console.log("Request Body:", req.body);
        console.log("File:", req.file);

        if (!image && req.file) {
            // Handle new image upload to S3
            const fileName = `blog_${Date.now()}-${req.file.originalname}`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: fileName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };

            const command = new PutObjectCommand(params);
            await s3.send(command);

            image = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            console.log('Image uploaded to S3:', image);
        } else if (!image) {
            // Fetch existing image if none provided
            const existingBlog = await Blog.findById(req.params.id);
            if (!existingBlog) return res.status(404).json({ error: 'Blog not found' });
            image = existingBlog.image;
            console.log("Existing image retained:", image);
        }

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Update blog fields
        blog.title = title;
        blog.content = content;
        blog.author = author;
        blog.source = source;
        blog.image = image;
        blog.updatedAt = Date.now();

        // Save updated blog
        await blog.save();
        console.log("Updated blog:", blog);

        res.status(200).json(blog);
    } catch (error) {
        console.error("Error updating blog post:", error);
        res.status(400).json({ error: error.message });
    }
});


// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
