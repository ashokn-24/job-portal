import express from "express";
import {
  getApplicationsByJob,
  getJobsByCompany,
  updateApplicationStatus,
} from "../controllers/dashboard.js";
import { protect, verifyRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/jobs/:id",
  protect,
  verifyRole("employee", "admin"),
  getJobsByCompany
);

router.get(
  "/jobs/:jobId/applications",
  protect,
  verifyRole("admin", "employee"),
  getApplicationsByJob
);

// router.get(
//   "/:companyId/applications",
//   protect,
//   verifyRole("admin", "employee"),
//   getAllApplication
// );

router.put(
  "/applications/:id/status",
  protect,
  verifyRole("admin", "employee"),
  updateApplicationStatus
);

export default router;
