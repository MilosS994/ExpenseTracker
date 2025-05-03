import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Sign up
export const signup = async (req, res, next) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  // Check if all fields are provided
  if (!fullName || !email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImageUrl: newUser.profileImageUrl,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        token: generateToken(newUser._id),
      },
    });
  } catch (error) {
    console.error("Error creating user: ", error.message);
    next(error);
  }
};

// Sign in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  //  Check if all fields are provided
  if (!email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    // Check if user exists
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Check if password is correct
    const isPasswordCorrect = await user.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Error signing in user: ", error.message);
    next(error);
  }
};

// Get user info
export const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(-"password");

    // Check if user exists
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User info retrieved successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Error getting user info: ", error.message);
    next(error);
  }
};
