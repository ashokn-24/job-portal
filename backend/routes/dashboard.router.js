import express from "express";
import { getJobsByCompany } from "../controllers/dashboard.js";
import { protect, verifyRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/jobs/:id",
  protect,
  verifyRole("employee", "admin"),
  getJobsByCompany
);

export default router;
