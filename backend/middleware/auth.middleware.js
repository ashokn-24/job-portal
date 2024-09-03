import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies
  token = req.cookies.jwt;

  // Check for token in headers if not found in cookies
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = await User.findById(decoded.userId).select("-password");
      console.log(req.user);
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized, token invalid" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token" });
  }
});

const verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: "You don't have permission to access this route",
      });
    } else {
      next(); // Call next() if the role matches to proceed with the route handler
    }
  };
};

export { protect, verifyRole };
