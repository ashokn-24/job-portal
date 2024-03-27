import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";

const router = express();

router.post("/signup", signup);

router.get("/signup", (req, res) => {
  res.send("signuped");
});

router.post("/login", login);

router.post("/logout", logout);

export default router;
