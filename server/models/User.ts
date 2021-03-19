import mongoose = require("mongoose");

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  isAdmin: boolean;
  isActive: boolean;
  role: string;
  links: any;
}

var userSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  links: [{ type: mongoose.Types.ObjectId, ref: "Link" }],
  // 	links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
});

var User = mongoose.model<IUser>("User", userSchema);

export = User;
