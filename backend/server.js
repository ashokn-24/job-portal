import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.router.js";
import employeeRoutes from "./routes/job.router.js";
import { connectToMongoDB } from "../db/connectMongoDb.js";
import { protect } from "./middleware/auth.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(protect);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/employee", employeeRoutes);

app.get("/", (req, res) => {
  res.send("hello Welcome to server");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on Port http://localhost:${PORT}/`);
});
