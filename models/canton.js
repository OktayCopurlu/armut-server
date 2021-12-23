import mongoose from "mongoose";
const Canton = new mongoose.Schema(
  {
    canton: {
      type: String,
      required: true,
    },

    gemainde: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Canton", Canton);
