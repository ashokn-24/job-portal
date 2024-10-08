import express from "express";
import {
  postJob,
  getJobs,
  getJobById,
  deleteJob,
} from "../controllers/job.controllers.js";
import { protect, verifyRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/postjob", protect, verifyRole("employee", "admin"), postJob);

router.get("/jobs", protect, verifyRole("employee", "admin"), getJobs);

router.get("/:id", protect, verifyRole("employee", "admin"), getJobById);

router.delete("/:id", protect, verifyRole("employee", "admin"), deleteJob);

export default router;
