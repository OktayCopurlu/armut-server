import mongoose from "mongoose";
const AllCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("AllCategories", AllCategoriesSchema);
