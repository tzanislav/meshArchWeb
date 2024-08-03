require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

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

const userRoutes = require('./routes/user');
const vizProjectRoutes = require('./routes/vizProject');
const uploadRoutes = require('./routes/upload');

app.use('/user', userRoutes);
app.use('/vizProject', vizProjectRoutes);
app.use('/upload', uploadRoutes);
app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
