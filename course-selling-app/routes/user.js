const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateJwt, USER_SECRET } = require('../middleware/user');
const { User, validateUser, Course, Purchases } = require('../db/index');

const router = express.Router();

// User
// 1. Signup
// 2. Login
// 3. View his purchased courses

router.post('/signup', async (req, res) => {
  const { username, password } = req.headers;
  try {
    validateUser({ username, password });
    // TODO: Hash the password using bcrypt
    const user = await User.findOne({ username });
    if (user) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, USER_SECRET, {
      expiresIn: '1h',
    });
    return res.json({ message: 'User created successfully', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.headers;
  try {
    validateUser({ username, password });
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ userId: user._id }, USER_SECRET, {
        expiresIn: '1h',
      });
      // TODO:Do cookie logic
      return res.json({
        message: 'Logged in successfully',
        token,
        isAdmin: false,
      });
    } else {
      return res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error signing in the user', error });
  }
});

router.get('/courses', authenticateJwt, async (req, res) => {
  const userId = req.userId;
  const purchases = await Purchases.find({ userId });

  const courseIds = purchases.map((purchase) => purchase.courseId);

  const purchasedCourses = await Course.find({
    _id: { $in: courseIds },
  });

  return res.json({ courses: purchasedCourses });
});

module.exports = router;
