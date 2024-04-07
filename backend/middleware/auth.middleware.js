import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = await User.findById(decoded.userId).select("-passwprd");
      console.log(req.user);
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized,invalid" });
    }
  } else {
    res.status(401).json({ error: "Not authorized,no token" });
  }
});

const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(403).json({
        message: "You don't have permission to access this route",
      });
    } else {
      next(); // Call next() if the role matches to proceed with the route handler
    }
  };
};

// const verifyRole = (...role) => {
//   return (req, res, next) => {
//     if (role.includes(req.user.role)) {
//       res.status(403).json({
//         message: "You don't have permission to access this route",
//       });
//     } else {
//       next(); // Call next() if the role matches to proceed with the route handler
//     }
//   };
// };

export { protect, verifyRole };
