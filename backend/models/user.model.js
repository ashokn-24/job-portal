import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      // required: true,
    },
    username: {
      type: String,
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
      // required: true,
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
  },
  { timestamp: true }
);

export const User = mongoose.model("User", userSchema);
