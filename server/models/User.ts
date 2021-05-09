import mongoose = require("mongoose");

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  logo: string;
  phone: string;
  isActive: boolean;
  banReason: string;
  type: string;
  role: string;
  links: any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
    default:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/54a8a787-4619-4b1f-a0ca-03ffac31b0a6-profile_image-300x300.png",
  },
  phone: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "user",
  },
  banReason: {
    type: String,
    default: "Without reason",
  },
  role: {
    type: String,
    required: true,
  },
  links: [{ type: mongoose.Types.ObjectId, ref: "Link" }],
});

export const User = mongoose.model<IUser>("User", userSchema);
