import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    duration: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    jobType: {
      type: String,
      // enum: ["Full-time", "Part-time", "Internship", "Remote"],
      default: "Full-time",
    },
    workType: {
      type: String,
      // enum: ["Onsite", "Hybrid", "Work From Home"],
      default: "Onsite",
    },
    location: {
      type: String,
    },
    industry: {
      type: String,
    },
    experienceLevel: {
      type: String,
    },
    salaryRange: {
      type: String,
    },
    skills: {
      type: Array,
      default: ["HTML", "CSS", "JavaScript", "React JS"],
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
