import express from "express";
import {
  postJob,
  getJobs,
  getJobById,
  deleteJob,
} from "../controllers/job.controllers.js";
import { protect, verifyRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/postjob", protect, verifyRole("employee"), postJob);

router.get("/jobs", protect, getJobs);

router.get("/:id", protect, getJobById);

router.delete("/:id", protect, deleteJob);
export default router;
