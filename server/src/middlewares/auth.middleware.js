import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

const authenticateUser = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  //   Check if the token is provided in the request headers
  if (!token) {
    const error = new Error("Authentication failed: no token provided");
    error.status = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.userId).select("-password -__v");
    if (!user) {
      const error = new Error("Authentication failed: user not found");
      error.statusCode = 401;
      return next(error);
    }
    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

export default authenticateUser;
