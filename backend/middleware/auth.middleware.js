import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token =
    req.cookies.jwt ||
    (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null);

  console.log("Token:", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      console.log("Authenticated User:", req.user);
      next();
    } catch (error) {
      console.log("Error verifying token:", error);
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
      next();
    }
  };
};

export { protect, verifyRole };
