import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

import authRoutes from "./routes/auth.router.js";
import employeeRoutes from "./routes/job.router.js";
import dashboardRoutes from "./routes/dashboard.router.js";
import { connectToMongoDB } from "../db/connectMongoDb.js";

const app = express();

const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on Port http://localhost:${PORT}/`);
});
