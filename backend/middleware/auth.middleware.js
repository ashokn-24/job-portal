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
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized,invalid" });
    }
  } else {
    res.status(401).json({ error: "Not authorized,no token" });
  }
});

export { protect };