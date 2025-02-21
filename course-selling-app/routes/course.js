const router = require('express').Router();
const { authenticateJwt, USER_SECRET } = require('../middleware/user');
const { Purchases, Course, validatePurchase } = require('../db/index');

// Course
// 1. To view a particular course
// 2. To view all the courses
// 3. To purchase a particular course by the user
// 4. To canceled the purchased course

router.get('/:courseId', authenticateJwt, async (req, res) => {
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

router.post('/purchase/:courseId', authenticateJwt, async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.params;
  try {
    validatePurchase({ userId, courseId });

    await Purchases.create({ userId, courseId });
    return res
      .status(200)
      .json({ message: 'You have successfully bought the course' });
  } catch (error) {
    console.error('Error purchasing the course', error);
    return res
      .status(404)
      .json({ message: 'Error purchasing the course', error });
  }
});

router.delete('/cancel/:courseId', authenticateJwt, async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.params;

  try {
    validatePurchase({ userId, courseId });

    const purchase = await Purchases.findOneAndDelete({ userId, courseId });

    if (!purchase) {
      return res.status(404).json({ message: 'Course not found in purchases' });
    }

    return res.status(200).json({ message: 'Course Successfully cancelled!' });
  } catch (error) {
    console.error('Error canceling the course', error);
    return res
      .status(500)
      .json({ message: 'Error canceling the course', error });
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
      .json({ message: 'Error fetching the courses', error });
  }
});

module.exports = router;
