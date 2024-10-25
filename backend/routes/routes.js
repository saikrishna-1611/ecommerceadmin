import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  createProduct,
  getProducts,
  createOrder,
  getUserOrders,
  updateDetailsByAdmin,
} from '../controllers/user.controller.js';
import { authUser } from '../middleware/authMiddleware.js'; // Authentication middleware
import { isAdmin } from '../middleware/isadmin.js'; // Admin role check middleware

const router = express.Router();

// User routes
router.post('/register', registerUser);  // Route to register a new user
router.post('/login', loginUser);        // Route for user login
router.get('/profile', authUser, getUserProfile);  // Protected route: only logged-in users can access
router.put('/updateprofile', authUser, updateUserProfile); // Protected route: only logged-in users can update their profile

// Product routes (Admin access required)
router.post('/createproducts', authUser, isAdmin, createProduct); // Only admin can create a product
router.get('/getproducts', authUser, getProducts);            // Any logged-in user can get the product list

// Order routes (User-specific)
router.post('/createorders/:_id', authUser, createOrder); // Protected route: only logged-in users can create an order
router.get('/getusersorders', authUser, getUserOrders); // Protected route: only logged-in users can view their orders
router.post('/updatebyadmin/:_id',authUser,isAdmin,updateDetailsByAdmin);
export default router;