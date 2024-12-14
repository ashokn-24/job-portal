import express from "express";
import {
  postJob,
  getJobs,
  getJobById,
  deleteJob,
  getEmpProfile,
  registerAsEmployee,
  updateJobById,
} from "../controllers/job.controllers.js";
import { protect, verifyRole } from "../middleware/auth.middleware.js";
import { applyJob, getUserApplications } from "../controllers/application.js";

const router = express.Router();

router.post("/register", registerAsEmployee);

router.get("/profile", protect, verifyRole("employee", "admin"), getEmpProfile);

router.post("/postjob", protect, verifyRole("employee", "admin"), postJob);

router.get("/jobs", getJobs);

router.post(
  "/jobs/:id/apply",
  protect,
  verifyRole("employee", "admin"),
  applyJob
);

router.get(
  "/applications",
  protect,
  verifyRole("employee", "admin"),
  getUserApplications
);

router
  .route("/job/:id")
  .get(getJobById)
  .put(protect, verifyRole("employee"), updateJobById)
  .delete(protect, verifyRole("employee", "admin"), deleteJob);

export default router;

// PUT /employer/profile – Update employer details (company info, logo, etc.).
// PUT /employer/jobs/ – Edit the job details (title, description, salary, etc.).
// GET /employer/jobs/applications – View all applications for a specific job.
// GET /employer/applications/ – View a specific application for a job posting.
// POST /employer/applications/status – Update the status of a job application (e.g., accepted, rejected, under review).
