import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/user.model";

const protact = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
    } catch (error) {
      res.status(404).json({ error: "Not authorized,invalid" });
    }
  } else {
    res.status(404).json({ error: "Not authorized,no token" });
  }
});
