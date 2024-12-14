import mongoose from "mongoose";

const skillSchema = mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Skill = mongoose.model("Skill", skillSchema);
