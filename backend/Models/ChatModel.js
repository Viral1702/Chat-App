const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  reciver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
