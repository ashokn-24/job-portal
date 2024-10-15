import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
      match: /^https?:\/\/[\w\-\.]+(\.[\w\-]+)+[/#?]?.*$/, // Basic website URL validation
    },
    address: {
      type: String,
    },
    contactEmail: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);
