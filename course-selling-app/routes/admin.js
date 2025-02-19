const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateAdminJwt, ADMIN_SECRET } = require('../middleware/admin');
const { Admin, Course, validateAdmin, validateCourse } = require('../db/index');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.headers;
  try {
    validateAdmin({ username, password });
    const user = await Admin.findOne({ username });
    if (user) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const newUser = new Admin({ username, password });
    await newUser.save();

    const token = jwt.sign({ adminId: newUser._id }, ADMIN_SECRET, {
      expiresIn: '1h',
    });
    res.json({ message: 'Admin created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.headers;
  try {
    validateAdmin({ username, password });
    const user = await Admin.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ adminId: user._id }, ADMIN_SECRET, {
        expiresIn: '1h',
      });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error signing in the user', error });
  }
});

router.post('/courses', authenticateAdminJwt, async (req, res) => {
  const { title, description, price, imageLink, published } = req.body;
  try {
    validateCourse({
      title,
      description,
      price,
      imageLink,
      published,
      creatorId: req.adminId,
    });
    const newCourse = new Course({
      title,
      description,
      price,
      imageLink,
      published,
      creatorId: req.adminId,
    });
    await newCourse.save();

    return res.status(200).json({
      message: 'Course created successfully!',
      courseId: newCourse._id,
    });
  } catch (error) {
    console.error('Error creating a course', error);
    return res.status(500).json({ message: 'Course creation failed!' });
  }
});

router.put('/courses/:courseId', authenticateAdminJwt, async (req, res) => {
  try {
    const id = req.params.courseId;
    const { title, description, price, imageLink, published } = req.body;

    validateCourse({ title, description, price, imageLink, published });
    const updatedCourse = await Course.findByIdAndUpdate(id, {
      title,
      description,
      price,
      imageLink,
      published,
    });

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json({ message: 'Course updated successfully!' });
  } catch (error) {
    console.error('Error updating a course', error);
    return res.status(404).json({ message: 'Error updating a course', error });
  }
});

router.get('/courses', authenticateAdminJwt, async (req, res) => {
  try {
    const allCourses = await Course.find();

    return res.status(200).json({ courses: allCourses });
  } catch (error) {
    console.error('Error fetching all the courses', error);
    return res
      .status(500)
      .json({ message: 'Failed to fetch all the courses', error });
  }
});

router.get('/courses/:courseId', authenticateAdminJwt, async (req, res) => {
  try {
    const id = req.params.courseId;
    const allCourses = await Course.findById(id);

    return res.status(200).json({ courses: allCourses });
  } catch (error) {
    console.error('Error fetching all the courses', error);
    return res
      .status(500)
      .json({ message: 'Failed to fetch all the courses', error });
  }
});

module.exports = router;
