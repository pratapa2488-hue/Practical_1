const express = require('express');
const mongoose = require('mongoose');
const Course = require('../models/Course');

const router = express.Router();
const requiredFields = ['courseName', 'trainer', 'duration', 'fees'];

function validateRequestBody(req, res, next) {
  const missing = requiredFields.filter((field) => req.body[field] === undefined);
  if (missing.length) {
    return res.status(400).json({ error: 'Missing required fields', missing });
  }

  if (typeof req.body.duration !== 'number' || req.body.duration <= 0) {
    return res.status(400).json({ error: 'duration must be a number greater than 0' });
  }

  if (typeof req.body.fees !== 'number' || req.body.fees <= 0) {
    return res.status(400).json({ error: 'fees must be a number greater than 0' });
  }

  next();
}

function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }

  next();
}

router.post('/', validateRequestBody, async (req, res, next) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
});

router.get('/cheap', async (req, res, next) => {
  try {
    const courses = await Course.find({ fees: { $lt: 5000 } });
    res.json(courses);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateObjectId, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateObjectId, validateRequestBody, async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateObjectId, async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
