import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

const generateTokens = async (userDetails) => {
  const accessToken = jwt.sign(
    {
      userId: userDetails._id,
      username: userDetails.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1m" }
  );

  const refreshToken = crypto.randomBytes(40).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);

  await RefreshToken.create({
    token: refreshToken,
    user: userDetails._id,
    expiresAt,
  });
  return {accessToken,refreshToken}
};

export default generateTokens;
