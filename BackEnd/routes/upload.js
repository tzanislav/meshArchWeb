const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../config/s3');
const VizProject = require('../models/VizProject');
const router = express.Router();

const upload = multer();

router.post('/', upload.array('images', 10), async (req, res) => {
    const imageUrls = [];

    try {
        for (const file of req.files) {
            const fileName = `${Date.now().toString()}-${file.originalname}`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const command = new PutObjectCommand(params);
            await s3.send(command);
            const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            imageUrls.push(url);
            console.log(url);
        }
    } catch (error) {
        res.status(400).send(error);
    }
    try {
        const vizProject = new VizProject(req.body);
        vizProject.urls = imageUrls;
        await vizProject.save();
        console.log(vizProject);
        res.status(201).send(vizProject);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Upload images to an existing project
router.post('/:id/images', upload.array('images', 10), async (req, res) => {
    const { id } = req.params;
    const imageUrls = [];

    try {
        for (const file of req.files) {
            const fileName = `${Date.now().toString()}-${file.originalname}`;
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const command = new PutObjectCommand(params);
            await s3.send(command);

            // Construct the URL directly
            const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            console.log(url);
            imageUrls.push(url);
        }

        const vizProject = await VizProject.findById(id);
        if (!vizProject) {
            return res.status(404).send({ error: 'Project not found' });
        }

        vizProject.urls = [...imageUrls, ...vizProject.urls];
        await vizProject.save();
        res.status(200).send(vizProject);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an image from an existing project
router.delete('/:id/images', async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;

    try {
        const vizProject = await VizProject.findById(id);
        if (!vizProject) {
            return res.status(404).send({ error: 'Project not found' });
        }

        const key = url.split('.amazonaws.com/')[1];
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        };

        const command = new DeleteObjectCommand(params);
        await s3.send(command);

        vizProject.urls = vizProject.urls.filter((imageUrl) => imageUrl !== url);
        await vizProject.save();
        res.status(200).send(vizProject);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
