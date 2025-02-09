const mongoose = require('mongoose');
const { z } = require('zod');
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

// Zod Schemas for Validation
const userSchemaZod = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const adminSchemaZod = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const courseSchemaZod = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be a positive number'),
  imageLink: z.string().url('Invalid image URL'),
  published: z.boolean(),
});

const purchaseSchemaZod = z.object({
  creatorId: ObjectId,
  userId: ObjectId,
});

const userSchema = new Schema({
  username: String,
  password: String,
});

const adminSchema = new Schema({
  username: String,
  password: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
  creatorId: ObjectId,
});

const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Purchases = mongoose.model('Purchases', purchaseSchema);

// Middleware for Validating Data Before Saving
const validateUser = (data) => userSchemaZod.parse(data);
const validateAdmin = (data) => adminSchemaZod.parse(data);
const validateCourse = (data) => courseSchemaZod.parse(data);
const validatePurchase = (data) => purchaseSchemaZod.parse(data);

module.exports = {
  connectToDatabase,
  User,
  Admin,
  Course,
  Purchases,
  validateUser,
  validateAdmin,
  validateCourse,
  validatePurchase,
};
