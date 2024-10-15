import jwt from "jsonwebtoken";

const generateTokensAndSetCookies = (userId, res) => {
  const payload = { userId }; // Construct payload object

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("accessToken", accessToken, {
    expiresIn: "1h",
    httpOnly: true,
    sameSite: true,
    secure: true,
  });

  // Set refresh token as a cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: true,
    secure: true,
  });
};

export default generateTokensAndSetCookies;
