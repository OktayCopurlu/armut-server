import mongoose from "mongoose";
const ServiceCategorySchema = new mongoose.Schema(
  {
    mainCategory: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("ServiceCategory", ServiceCategorySchema);
