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
let atlasWhitelistError = false;
let atlasWhitelistErrorMessage = null;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    atlasWhitelistError = false;
    atlasWhitelistErrorMessage = null;
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    if (error.name === 'MongooseServerSelectionError' && /whitelist/i.test(error.message)) {
      atlasWhitelistError = true;
      atlasWhitelistErrorMessage = 'MongoDB Atlas connection blocked: current server IP is not whitelisted.';
      console.error(atlasWhitelistErrorMessage);
    }
  });

app.use((req, res, next) => {
  if (atlasWhitelistError) {
    const message = atlasWhitelistErrorMessage || 'MongoDB connection blocked due to Atlas network access restrictions.';

    if (req.accepts('html')) {
      return res.status(503).send(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Service Unavailable</title><style>body{font-family:Arial,Helvetica,sans-serif;background:#111;color:#eee;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:0 1.5rem;text-align:center;}main{max-width:32rem;}h1{font-size:1.8rem;margin-bottom:1rem;}p{line-height:1.5;}</style></head><body><main><h1>Service temporarily unavailable</h1><p>${message}</p><p>Update the Atlas network access list for this server IP, then restart the backend.</p></main></body></html>`);
    }

    if (req.accepts('json')) {
      return res.status(503).json({ message });
    }

    return res.status(503).type('text/plain').send(`${message}
Update the Atlas network access list for this server IP, then restart the backend.`);
  }
  next();
});

const suspiciousPatterns = [
  /\/cgi-bin/i,
  /\.php(\?|$)/i,
  /\.asp(\?|$)/i,
  /\.env/i,
  /\/wp-admin/i,
  /%25%/i,
];

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const remoteAddress = req.ip || req.socket?.remoteAddress || 'unknown-ip';

  if (suspiciousPatterns.some((pattern) => pattern.test(req.originalUrl))) {
    console.warn(`[${timestamp}] Blocked suspicious request from ${remoteAddress}: ${req.method} ${req.originalUrl}`);
    return res.status(404).send('Not Found');
  }

  return next();
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

app.use((err, req, res, next) => {
  if (err instanceof URIError || (typeof err.message === 'string' && err.message.includes('Failed to decode param'))) {
    const timestamp = new Date().toISOString();
  const remoteAddress = req.ip || req.socket?.remoteAddress || 'unknown-ip';
    console.error(`[${timestamp}] Ignored malformed request from ${remoteAddress} targeting ${req.originalUrl}: ${err.message}`);
    return res.status(400).send('Bad Request');
  }

  return next(err);
});

const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

// Create HTTP server
http.createServer(app).listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
});

if (process.env.DEV_MODE !== 'development') {
  const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/mesharch.studio/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/mesharch.studio/fullchain.pem'),
  };

  https.createServer(sslOptions, app).listen(HTTPS_PORT, '0.0.0.0', () => {
    console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
  });
}
