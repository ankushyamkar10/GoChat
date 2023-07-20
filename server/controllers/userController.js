const asyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400);
    throw new Error('Please fill all the details')
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already exists!");
  }

  //hashing of password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAvtarSet: newUser.isAvtarSet,
      img: newUser.img,
      token: generateToken(res, newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

})


const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const user = await User.findOne({ name });

  if (user) {
    if (await bcryptjs.compare(password, user.password)) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAvtarSet: user.isAvtarSet,
        img: user.img,
        token: generateToken(res, user._id),
      });
      console.log(`logged in as ${user.name}`);
    } else {
      res.status(400);
      throw new Error("Password does not matches...");
    }
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: '30d'
  })
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
}

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users)
    res.status(200).json(users)
  else {
    res.status(400);
    throw new Error("Users not found!");
  }

})

module.exports = {
  registerUser,
  loginUser,
  getAllUsers
}