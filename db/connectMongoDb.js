import mongoose from "mongoose";
import dotenv from "dotenv";
import { Company } from "../backend/models/company.model.js";
dotenv.config();

import jobsData from "../backend/master data/job.js";
import { Job } from "../backend/models/job.model.js";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");

    // Job.insertMany(jobsData)
    //   .then((docs) => {
    //     console.log("Multiple documents inserted to Collection:", docs);
    //     mongoose.connection.close();
    //   })
    //   .catch((err) => {
    //     console.error("Error inserting documents:", err);
    //     mongoose.connection.close(); // Close the connection on error
    //   });

    // Company.insertMany(dummyCompanies)
    //   .then((docs) => {
    //     console.log("Multiple documents inserted to Collection:", docs);
    //     mongoose.connection.close(); // Close the connection after insertion
    //   })
    // .catch((err) => {
    //   console.error("Error inserting documents:", err);
    //   mongoose.connection.close(); // Close the connection on error
    // });
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};
