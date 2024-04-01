import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    contacts: {
      type: String,
    },
  },
  { timestamp: true }
);

export const Job = mongoose.model("Job", jobSchema);
