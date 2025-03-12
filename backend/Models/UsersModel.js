const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
