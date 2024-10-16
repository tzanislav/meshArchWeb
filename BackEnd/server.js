require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/user/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/user/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Import routes
const userRoutes = require('./routes/user');
const vizProjectRoutes = require('./routes/vizProject');
const uploadRoutes = require('./routes/upload');
const apiRoutes = require('./routes/api');

// Static files
app.use(express.static(path.join(__dirname, '../FrontEnd/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/build', 'index.html'));
});

// Use routes
app.use('/api', apiRoutes);
app.use('/user', userRoutes);
app.use('/vizProject', vizProjectRoutes);
app.use('/upload', uploadRoutes);

// Test connection
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
app.get('/test', (req, res) => {
  console.log('Test connection successful');
  res.send('Test connection successful');
});

const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

// Create HTTP server
http.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
});

// Create HTTPS server
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/mesharch.studio/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/mesharch.studio/fullchain.pem'),
};

https.createServer(sslOptions, app).listen(HTTPS_PORT, '0.0.0.0', () => {
  console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});