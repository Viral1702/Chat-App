const UserModel = require("../Models/UsersModel");

const signup = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) return res.status(403).json({ message: "User already exists" });
    const newUser = await UserModel.create(req.body);
    res.status(200).json({
      message: "Your Account has been created",
      newUser,
    });
  } catch (error) {
    console.log("Signup Error: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const signin = (req, res) => {
  res.status(200).json({ message: "Login Successfully" });
};

module.exports = { signin, signup };
