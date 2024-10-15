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
    description: {
      type: String,
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
    },
    contactEmail: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
