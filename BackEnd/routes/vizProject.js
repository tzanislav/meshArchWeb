const express = require('express');
const multer = require('multer');
const VizProject = require('../models/VizProject');
const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure the 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Create a new VizProject
router.post('/', async (req, res) => {
  try {
    const vizProject = new VizProject(req.body);
    await vizProject.save();
    res.status(201).send(vizProject);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all VizProjects
router.get('/', async (req, res) => {
  try {
    const vizProjects = await VizProject.find({});
    res.send(vizProjects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a VizProject by ID
router.get('/:id', async (req, res) => {
  try {
    const vizProject = await VizProject.findById(req.params.id);
    if (!vizProject) {
      return res.status(404).send();
    }
    res.send(vizProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a VizProject by ID
router.put('/:id', async (req, res) => {
  try {
    const vizProject = await VizProject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!vizProject) {
      return res.status(404).send();
    }
    res.send(vizProject);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a VizProject by ID
router.delete('/:id', async (req, res) => {
  try {
    const vizProject = await VizProject.findByIdAndDelete(req.params.id);
    if (!vizProject) {
      return res.status(404).send();
    }
    res.send(vizProject);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Reorder images in a VizProject by moving one to the first position
router.put('/:id/images/reorder', async (req, res) => {
  const { url } = req.body;
  try {
    const vizProject = await VizProject.findById(req.params.id);
    if (!vizProject) {
      return res.status(404).send({ message: 'VizProject not found' });
    }

    // Remove the URL from the array if it exists
    const urlIndex = vizProject.urls.indexOf(url);
    if (urlIndex === -1) {
      return res.status(404).send({ message: 'Image URL not found' });
    }
    vizProject.urls.splice(urlIndex, 1);

    // Add the URL to the start of the array
    vizProject.urls.unshift(url);

    // Save the updated project
    await vizProject.save();
    res.send(vizProject);
  } catch (error) {
    console.error('Error reordering image:', error);
    res.status(500).send({ message: 'Error reordering image', error });
  }
});

// Image upload endpoint
router.post('/upload/:id/images', upload.single('image'), async (req, res) => {
  try {
    const vizProject = await VizProject.findById(req.params.id);
    if (!vizProject) {
      return res.status(404).send({ message: 'VizProject not found' });
    }

    // Add the image URL to the project's image URLs array
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    vizProject.urls.push(imageUrl);

    // Save the updated project
    await vizProject.save();
    res.send(vizProject);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send({ message: 'Error uploading image', error });
  }
});

module.exports = router;
