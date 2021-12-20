import mongoose from "mongoose";

const Asked_service = new mongoose.Schema(
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
    asked_service_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Asked_service", Asked_service);
