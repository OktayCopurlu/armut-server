import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    status: {
      type: String,
    },
    photo: {
      type: String,
    },
    provider: {
      type: Boolean,
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],

    asked_service: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asked_service",
      },
    ],
    given_service: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Given_service",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", UserSchema);
