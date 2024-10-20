import jwt from "jsonwebtoken";

const generateTokensAndSetCookies = async (userId, res) => {
  const payload = { userId };

  const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = await jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Set refresh token as a cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: true,
    secure: true,
  });

  return { accessToken, refreshToken };
};

export default generateTokensAndSetCookies;
