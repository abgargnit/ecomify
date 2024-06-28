import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import dotenv from 'dotenv';
dotenv.config();



// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email,password } = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);
        res.status(200).json({
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
    const {name, email, password} = req.body;
    const UserExists = await User.findOne({email});
    if(UserExists){
      res.status(400); // client error 
      throw new Error('User already exists!');
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    // now check for the user
    if(user){
      generateToken(res,user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // password: user.password , we dont want to show the password
        isAdmin: user.isAdmin,
      })
    }else{
      res.status(400);
      throw new Error('Invalid user data');
    }


});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user){
    res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
    });
  }else{
    res.status(404);
    throw new Error('User not found!');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user){
    user.name = req.body.name || user.name ;
    user.email = req.body.email || user.email;

    // we want to mess with the password only if it has to be changed as it is hashed

    if(req.body.password){
      user.password = req.body.password;
    }

    const updateuser = await user.save();

    res.status(200).json({
      _id: updateuser._id,
      name: updateuser.name,
      email:updateuser.email,
      isAdmin: updateuser.isAdmin,
    })
  }
  else{
    res.status(404);
    throw new Error('User not found!');
  }
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