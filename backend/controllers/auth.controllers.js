import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import genrateTokenAndSetCookie from "../utils/genrateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({ error: "Email already exits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // HASING PASSWORD

    //https://avatar-placeholder.iran.liara.run/
    const userProfilePic = "https://avatar.iran.liara.run/public/35";

    //CREATE NEW USER PROFILE
    const user = new User({
      email,
      password: hashedPassword,
    });

    console.log({
      email,
      password: hashedPassword,
      profilePic: userProfilePic,
    });

    if (user) {
      genrateTokenAndSetCookie(user.id, res);
      await user.save(); // SAVE USER PROFILE

      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("error in login controller", error);
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

    genrateTokenAndSetCookie(user.id, res);

    res.status(201).json({
      id: user.id,
      // username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log("error in signup controller", error);
    res.status(500).json({ error: error.message });
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
      res.status(404);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.email = req.body.email || user.email;
      user.username = req.body.username;
      user.age = req.body.age;
      user.gender = req.body.gender;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt"); // Clear the JWT cookie

  // Send a response indicating successful logout
  res.status(200).json({ message: "Logout successfully" });
};
