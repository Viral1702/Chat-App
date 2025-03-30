import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import coludinary from "../lib/cloudinary.js";

// Sign up
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // check all fileds are filled
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fildes are required" });

    // password is greaterthen 6 char
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    // check email is exists or not
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // creating a new user
    const newUser = await new User({ fullName, email, password: hashPassword });

    if (newUser) {
      // generate token and save the toke in user's cookie
      generateToken(newUser._id, res);
      // save user in db
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // is user exist
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    generateToken(user._id, res);

    // sending response
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout
export const logout = (req, res) => {
  try {
    // clear the cookie
    res.cookie("jwt", "", { maxAge: 0 });

    // Sending response
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // get Profile pic
    const { profilePic } = req.body;
    const userId = req.user._id;

    // if not then return
    if (!profilePic)
      return res.status(400).json({ message: "Profile pic is required" });

    // upload in cloudinary
    const uploadResponse = await coludinary.uploader.upload(profilePic);

    // update user in DB and send updated user ( using new:true )
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    // sending response
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in logout controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // sendind a user which can store in cookies token
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
