import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { config } from "dotenv";

config();

export const protectRoute = async (req, res, next) => {
  try {
    // get token into cookies
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });

    // get the user from DB
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // set user into req object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
