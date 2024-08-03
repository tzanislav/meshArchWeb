const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3 = require('../config/s3');
const VizProject = require('../models/VizProject');
const router = express.Router();

const upload = multer();

router.post('/', upload.array('images', 10), async (req, res) => {
    const { name, type, description } = req.body;
    const imageUrls = [];

    try {
        for (const file of req.files) {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `${Date.now().toString()}-${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const command = new PutObjectCommand(params);
            await s3.send(command);
            const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            imageUrls.push(signedUrl);
        }

        const vizProject = new VizProject({
            name,
            type,
            description,
            urls: imageUrls,
        });

        await vizProject.save();
        res.status(201).send(vizProject);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        console.log("upload");
        res.send("vizProjects");
    } catch (error) {
        res.status(500).send
    }
});

module.exports = router;
