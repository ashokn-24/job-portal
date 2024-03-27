import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
    },
    companyName: {
      type: String,
    },
    duration: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamp: true }
);

export const Job = mongoose.model("Job", jobSchema);
