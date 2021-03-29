"use strict";
var mongoose = require("mongoose");
var feedbackSchema = new mongoose.Schema({
    date: { type: Date, "default": Date.now },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    ownerLogo: { type: String },
    ownerEmail: { type: String, required: true },
    ownerFirstName: { type: String, required: true },
    ownerLastName: { type: String, required: true },
    company: {
        type: mongoose.Types.ObjectId,
        ref: "CleaningCompany",
        required: true
    },
    rating: { type: String, required: true },
    text: { type: String, "default": "" }
});
var Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
