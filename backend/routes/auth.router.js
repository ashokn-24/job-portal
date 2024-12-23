import express from "express";
import { protect, verifyRole } from "../middleware/auth.middleware.js";
import {
  login,
  logout,
  signup,
  getUser,
  updateUser,
  refresh,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh", refresh);

router
  .route("/profile")
  .get(protect, verifyRole("basic", "employee", "admin"), getUser)
  .put(protect, verifyRole("basic", "employee", "admin"), updateUser);

export default router;
