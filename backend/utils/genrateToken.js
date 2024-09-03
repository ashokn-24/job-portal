import jwt from "jsonwebtoken";

const generateTokensAndSetCookies = (userId, res) => {
  const payload = { userId }; // Construct payload object

  // Generate access token
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  // Generate refresh token
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  // Set access token as a cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 15 * 60 * 1000, // 15 minutes
    httpOnly: true,
    sameSite: true,
    secure: true,
  });

  // Set refresh token as a cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    sameSite: true,
    secure: true,
  });
};

export default generateTokensAndSetCookies;
