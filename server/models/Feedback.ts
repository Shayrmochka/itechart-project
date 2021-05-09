import mongoose = require("mongoose");

export interface IFeedback extends mongoose.Document {
  date: Date;
  owner: string;
  ownerLogo: string;
  ownerEmail: string;
  ownerFirstName: string;
  ownerLastName: string;
  company: string;
  rating: string;
  text: string;
}

const feedbackSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  ownerLogo: { type: String },
  ownerEmail: { type: String, required: true },
  ownerFirstName: { type: String, required: true },
  ownerLastName: { type: String, required: true },
  company: {
    type: mongoose.Types.ObjectId,
    ref: "CleaningCompany",
    required: true,
  },
  rating: { type: String, required: true },
  text: { type: String, default: "" },
});

export const Feedback = mongoose.model<IFeedback>("Feedback", feedbackSchema);
