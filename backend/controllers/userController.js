import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email,password } = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        // Now we will create token
        const token = jwt.sign({userId : user._id }, process.env.SECRET_KEY, 
            {
                expiresIn: '30d', 
            }
        );
         // set jwt as Http-only cookie
        res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict', //  to prevent attacks
                    maxAge: 30*24*60*60*1000 // this will be 30 days...
                })

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
        else{
            res.status(401);
            throw new Error('invalid password or email');
        }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// @desc    Logout User and delete it from browser cookie
// @route   POST /api/users/profile
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  //  what we want here is that cookie needs to be cleared from the browser..
      res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
      })

      res.status(200).json({message: 'Logged out successfully!'});
  });

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser,
};