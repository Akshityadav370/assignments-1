//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.json());

const secret = process.env.JWT_SECRERT; // This should be in an environment variable in a real application
const port = process.env.PORT;

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  // userSchema here
});

const adminSchema = new mongoose.Schema({
  // adminSchema here
});

const courseSchema = new mongoose.Schema({
  // courseSchema here
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

const authMiddleware = (req, res, next) => {
  //  authMiddleware logic here
};

// Connect to MongoDB
mongoose.connect('<YourMongoDbConnectionString>');

app.listen(port, () => {
  console.log('Server is listening on port 3000');
});
