const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  trainer: {
    type: String,
    required: [true, 'Trainer name is required'],
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be greater than 0']
  },
  fees: {
    type: Number,
    required: [true, 'Fees is required'],
    min: [1, 'Fees must be greater than 0']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);