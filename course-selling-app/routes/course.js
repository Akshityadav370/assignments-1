const router = require('express').Router();
const { authenticateJwt, USER_SECRET } = require('../middleware/user');
const { Purchases, Course } = require('../db/index');

router.post('/purchase', authenticateJwt, async (req, res) => {
  const userId = req.userId;
  const courseId = req.headers.courseId;

  try {
    await Purchases.create({ userId, courseId });
    return res
      .status(200)
      .json({ message: 'You have successfully bought the course' });
  } catch (error) {
    console.error('Error purchasing the course', error);
    return res
      .status(404)
      .json({ message: 'Error purchasing the course' }, error);
  }
});

router.get('/preview', async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching the courses', error);
    return res
      .status(401)
      .json({ message: 'Error fetching the courses' }, error);
  }
});

module.exports = router;
