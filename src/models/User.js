import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    job: {
      type: String,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);