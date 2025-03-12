const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const ConnectDB = async () => {
  try {
    const connction = mongoose.connect(process.env.DATABASE_URL);
    if (connction) console.log("Connected to DB");
  } catch (error) {
    console.log("Connection Error: ", error);
  }
};

module.exports = ConnectDB;
