"use strict";
var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
    date: { type: Date, "default": Date.now },
    dateCleaning: { type: Date },
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
    ownerLogo: { type: String },
    ownerEmail: { type: String },
    orderTo: { type: mongoose.Types.ObjectId, ref: "CleaningCompany" },
    address: { type: String },
    services: { type: String },
    flatDescription: { type: String },
    checked: { type: Boolean, "default": false },
    status: { type: String, "default": "waiting" }
});
var Order = mongoose.model("Order", orderSchema);
module.exports = Order;
