const mongoose = require('mongoose');

const VizProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  urls: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('VizProject', VizProjectSchema);
