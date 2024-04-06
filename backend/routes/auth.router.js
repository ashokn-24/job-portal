import express from "express";
import { protect, verifyRole } from "../middleware/auth.middleware.js";
import {
  login,
  logout,
  signup,
  getUser,
  updateUser,
} from "../controllers/auth.controllers.js";

const router = express.Router();

// router.post("/postjob", postJob);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router
  .route("/profile")
  .get(protect, verifyRole("basic"), getUser)
  .put(protect, verifyRole("basic"), updateUser);

export default router;
