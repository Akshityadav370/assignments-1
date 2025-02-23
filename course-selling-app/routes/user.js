const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authenticateJwt, USER_SECRET } = require('../middleware/user');
const { User, validateUser, Course, Purchases } = require('../db/index');

const router = express.Router();

// User
// 1. Signup
// 2. Login
// 3. View his purchased courses

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    validateUser({ username, password });

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      message: 'User created successfully',
      redirect: '/login',
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error creating user: ${error.message}`,
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    validateUser({ username, password });

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(403).json({ message: 'Invalid username or password' });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).json({ message: 'Wrong username/password!' });
    }

    const token = jwt.sign({ userId: user._id }, USER_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      token: token,
      message: 'Login successful',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error signing in the user',
      error: error.message,
    });
  }
});

router.get('/courses', authenticateJwt, async (req, res) => {
  const userId = req.userId;
  const userData = await User.findById(userId);
  const purchases = await Purchases.find({ userId });

  const courseIds = purchases.map((purchase) => purchase.courseId);

  const purchasedCourses = await Course.find({
    _id: { $in: courseIds },
  });

  return res.json({ courses: purchasedCourses, username: userData.username });
});

module.exports = router;
