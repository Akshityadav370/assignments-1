const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authenticateAdminJwt, ADMIN_SECRET } = require('../middleware/admin');
const { Admin, Course, validateAdmin, validateCourse } = require('../db/index');

const router = express.Router();

// Admin
// 1. Signup
// 2. Login
// 3. Create a Course
// 4. Update a Course
// 5. Delete a Course

router.post('/signup', async (req, res) => {
  const { username, password } = req.headers;
  try {
    validateAdmin({ username, password });

    const user = await Admin.findOne({ username });
    if (user) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ adminId: newUser._id }, ADMIN_SECRET, {
      expiresIn: '1h',
    });
    return res.json({ message: 'Admin created successfully', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.headers;
  try {
    validateAdmin({ username, password });

    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(403).json({ message: 'Invalid username or password' });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).json({ message: 'Wrong username/password!' });
    }

    const token = jwt.sign({ adminId: user._id }, ADMIN_SECRET, {
      expiresIn: '1h',
    });

    return res.json({
      message: 'Logged in successfully',
      token,
      isAdmin: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error signing in the user', error });
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

router.delete('/courses/:courseId', authenticateAdminJwt, async (req, res) => {
  try {
    const id = req.params.courseId;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json({ message: 'Course deleted successfully!' });
  } catch (error) {
    console.error('Error deleting a course', error);
    return res.status(404).json({ message: 'Error deleting a course', error });
  }
});

module.exports = router;
