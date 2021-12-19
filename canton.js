import mongoose from "mongoose";
const CantonSchema = new mongoose.Schema(
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
export default mongoose.model("Canton", CantonSchema);
