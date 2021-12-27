import mongoose from "mongoose";

const Given_Offer = new mongoose.Schema(
  {
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message",
        required: true,
      },
    ],
    price: {
      type: String,
      required: true,
    },
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bidderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asked_service",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Given_Offer", Given_Offer);
