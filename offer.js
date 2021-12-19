import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema(
  {
    canton: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    more_info: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    offeredUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Offer", OfferSchema);
