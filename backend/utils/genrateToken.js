import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const payload = { userId }; // Construct payload object
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60,
    httpOnly: true,
    sameSite: true,
    secure: true,
  });
};

export default generateTokenAndSetCookie;
