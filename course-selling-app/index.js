const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const dotenv = require('dotenv');
const path = require('path');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
const adminRouter = require('./routes/admin');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
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
