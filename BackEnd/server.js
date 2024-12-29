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


// Import routes
const userRoutes = require('./routes/user');
const vizProjectRoutes = require('./routes/vizProject');
const uploadRoutes = require('./routes/upload');
const apiRoutes = require('./routes/api');
const blogRoutes = require('./routes/blogs');

// Use routes
app.use('/api', apiRoutes);
app.use('/user', userRoutes);
app.use('/vizProject', vizProjectRoutes);
app.use('/upload', uploadRoutes);
app.use('/api/blog', blogRoutes);

// Test connection
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
app.get('/test', (req, res) => {
  console.log('Test connection successful');
  res.send('Test connection successful');
});


// Static files
app.use(express.static(path.join(__dirname, '../FrontEnd/build')));

// Catch-all route for React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/build', 'index.html'));
});

const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

// Create HTTP server
http.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
});

if(process.env.DEV_MODE != 'development') {

// Create HTTPS server
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/mesharch.studio/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/mesharch.studio/fullchain.pem'),
};

https.createServer(sslOptions, app).listen(HTTPS_PORT, '0.0.0.0', () => {
  console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});

}
