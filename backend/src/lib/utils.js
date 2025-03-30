import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId, res) => {
  // sign JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  // set into users cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Expires time in milisecounds
    httpOnly: true, // not accessable to js
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development", // in devploment http works other wise hhtps will be nacessary
  });
  // return token
  return token;
};
