import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
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
export default mongoose.model("Category", CategorySchema);
