import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import generateTokensAndSetCookies from "../utils/genrateToken.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, gender, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashing password

    const userProfilePic = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }`;

    // Create new user profile
    const user = new User({
      name,
      email,
      profilePic: userProfilePic,
      password: hashedPassword,
    });

    if (user) {
      const { accessToken } = await generateTokensAndSetCookies(user.id, res);
      await user.save();

      res.status(201).json({
        accessToken,
        user,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordTrue = await bcrypt.compare(password, user?.password || "");

    if (!user) {
      return res.status(400).send({ message: "Invalid user email." });
    }
    if (!isPasswordTrue) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const { accessToken, refreshToken } = await generateTokensAndSetCookies(
      user.id,
      res
    );

    res.status(201).json({
      accessToken,
      user,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ error: error.message });
  }
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const { accessToken } = await generateTokensAndSetCookies(user.id, res);

    res.status(200).json({ accessToken, user });
  } catch (error) {
    console.log("Error in refreshToken controller", error);
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.username || "",
        email: user.email,
        age: user.age,
        gender: user.gender,
        role: user.role,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update basic information
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.gender = req.body.gender || user.gender;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.resume = req.body.resume || user.resume;

    // Update password if provided
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update education if provided
    if (req.body.education) {
      user.education = req.body.education; // Assuming req.body.education is an array
    }

    // Update experience if provided
    if (req.body.experience) {
      user.experience = req.body.experience; // Assuming req.body.experience is an array
    }

    // Save the updated user data
    const updatedUser = await user.save();

    // Respond with updated user data
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      gender: updatedUser.gender,
      profilePic: updatedUser.profilePic,
      resume: updatedUser.resume,
      education: updatedUser.education,
      experience: updatedUser.experience,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logout successfully" });
};
