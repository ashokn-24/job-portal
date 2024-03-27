import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import genrateTokenAndSetCookie from "../utils/genrateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    console.log(password);
    console.log(typeof password);
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({ error: "Email already exits" });
    }

    // HASING PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    //https://avatar-placeholder.iran.liara.run/
    const userProfilePic = "https://avatar.iran.liara.run/public/35";

    //CREATE NEW USER PROFILE
    console.log("Creating new user with data:", {
      // username,
      email,
      password,
      confirmPassword,
    });

    console.log(typeof password);

    const newUser = new User({
      // username,
      email,
      password: hashedPassword,
      profilePic: userProfilePic,
    });

    if (newUser) {
      genrateTokenAndSetCookie(newUser.id, res);

      await newUser.save(); // SAVE USER PROFILE

      res.status(201).json({
        id: newUser.id,
        // username: newUser.username,
        email: newUser.email,
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
      return res.status(400).send({ message: "Invalid username." });
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

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("error in logout controller", error);
    res.status(500).json({ error: error.message });
  }
};
