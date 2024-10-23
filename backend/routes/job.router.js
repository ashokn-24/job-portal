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

const router = express.Router();

router.post("/register", registerAsEmployee);

router.get("/profile", protect, verifyRole("employee", "admin"), getEmpProfile);

router.post("/postjob", protect, verifyRole("employee", "admin"), postJob);

router.get("/jobs", getJobs);

router
  .route("/job/:id")
  .get(getJobById)
  .put(protect, verifyRole("employee"), updateJobById)
  .delete(protect, verifyRole("employee", "admin"), deleteJob);

export default router;

// GET /employer/jobs – Get a list of all job postings made by the employer.
// GET /employer/jobs/ – Get details of a specific job posting.
// DELETE /employer/jobs/ – Remove a job posting.
// GET /employer/profile – Get the employer’s profile details.

// PUT /employer/profile – Update employer details (company info, logo, etc.).
// PUT /employer/jobs/ – Edit the job details (title, description, salary, etc.).
// GET /employer/jobs/applications – View all applications for a specific job.
// GET /employer/applications/ – View a specific application for a job posting.
// POST /employer/applications/status – Update the status of a job application (e.g., accepted, rejected, under review).
