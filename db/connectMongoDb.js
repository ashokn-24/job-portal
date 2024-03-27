// import { mongoose } from "mongoose";

// export const connectToMongoDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_DB_URI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.log("Error connecting MongoDB", error.message);
//   }
// };

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};
