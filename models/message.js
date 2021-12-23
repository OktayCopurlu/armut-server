import mongoose from "mongoose";

const Message = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Message", Message);


