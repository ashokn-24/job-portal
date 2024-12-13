import mongoose from "mongoose";
import educationSchema from "./education.model.js";
import experienceSchema from "./experience.model.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "basic", "employee"],
      default: "basic",
    },
    resume: {
      type: String,
      default: "",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: function () {
        return this.role === "employee";
      },
    },
    education: [educationSchema],
    experience: [experienceSchema],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
