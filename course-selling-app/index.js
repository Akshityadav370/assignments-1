const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

const { connectToDatabase } = require('./db');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
const adminRouter = require('./routes/admin');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/course/preview');
    const courses = response.data;
    console.log('Courses received:', response.data);
    res.render('home', { courses });
  } catch (error) {
    res.status(500).send(`Error loading courses ${error}`);
  }
});

connectToDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log('Server running on port ', PORT));
});

// TODO
// 1. Cookie based authentication instead of jwt
// 2. Passport js
// 3. Add a rate limiting middleware
// 4. Frontend in ejs
