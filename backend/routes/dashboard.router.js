import express from "express";
import {
  getApplicationProfile,
  getApplicationsByJob,
  getJobsByCompany,
  updateApplicationStatus,
} from "../controllers/dashboard.js";
import { protect, verifyRole } from "../middleware/auth.middleware.js";
import { getApplicationByCompany } from "../controllers/application.js";

const router = express.Router();

// get company jobs
router.get(
  "/jobs/:id",
  protect,
  verifyRole("employee", "admin"),
  getJobsByCompany
);

// get application by job id
router.get(
  "/jobs/:jobId/applications",
  protect,
  verifyRole("admin", "employee"),
  getApplicationsByJob
);



// get applied user profile for review
router.get(
  "/jobs/applications/:id",
  protect,
  verifyRole("admin", "employee"),
  getApplicationProfile
);

// update application status
router.put(
  "/applications/status/:id",
  protect,
  verifyRole("admin", "employee"),
  updateApplicationStatus
);

export default router;
