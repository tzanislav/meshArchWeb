const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    console.log('User not found');
    return res.status(400).send('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('Invalid password');
    return res.status(400).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id }, 'secretkey', {
    expiresIn: '1h',
  });

  console.log('User logged in');
  res.json({ token });
});

router.get ('/test', (req, res) => {
  console.log('Test');
  res.send('Test');
});

module.exports = router;
