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
    type: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "full-time",
    },
    skills: {
      type: Array,
      default: ["HTML", "CSS", "JavaScript", "React JS"],
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
