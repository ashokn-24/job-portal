import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  login,
  logout,
  signup,
  getUser,
  updateUser,
} from "../controllers/auth.controllers.js";

const router = express();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.route("/profile").get(protect, getUser).put(protect, updateUser);

export default router;
