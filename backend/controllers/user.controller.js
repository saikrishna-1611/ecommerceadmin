import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Registering a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({user});
  } catch (error) {
    res.status(500).json({ status:'fail',message:error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    res.status(500).json({status:'fail',message:error.message});
  }
};

// Get user profile (user can see his profile upon login )
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ status:'fail',message:error.message });
  }
};

// Update user profile (protected route)
export const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (name) user.name = lastname;
    if (email) user.email = email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'User profile updated successfully',
     updatedUser
    });
  } catch (error) {
    res.status(500).json({ status:'fail',message:error.message });
  }
};



// Create new product
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Create new order
export const createOrder = async (req, res) => {
  try {
    const { _id } = req.params;
    const { quantity } = req.query; 

    const verifyProduct = await Product.findById(_id);
    if (!verifyProduct) {
      return res.status(400).json({ message: 'Product not found' });
    }

    const order = new Order({
      user: req.user.id,
      products: [
        {
          product: verifyProduct._id, 
          quantity: quantity, 
        },
      ],
      totalAmount: verifyProduct.price * quantity, 
    });

    await order.save();
    verifyProduct.stock-=1;
    await verifyProduct.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get orders for user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateDetailsByAdmin=async(req,res)=>{
  try{
  const{name,category,price,stock,description}=req.body
  const{_id}=req.params
  const verifyProduct=await Product.findById(_id);
  if(!verifyProduct){
    return res.status(400).json({status:'fail',message:error.message})
  }
  if(name)verifyProduct.name=name;
  if(category)verifyProduct.category=category;
  if(price)verifyProduct.price=price;
  if(stock)verifyProduct.stock=stock;
  if(description)verifyProduct.description=description;

  await verifyProduct.save();
  return res.status(200).json({verifyProduct});
  }
  catch(error){
    return res.status(500).json({message:error.message})
  }
}