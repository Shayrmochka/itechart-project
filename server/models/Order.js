"use strict";
var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
    date: { type: Date, "default": Date.now },
    dateCleaning: { type: Date },
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Types.ObjectId, ref: "CleaningCompany" },
    address: { type: String },
    serviceName: { type: String },
    typeOfService: { type: String },
    flatDescription: { type: String },
    checked: { type: Boolean, "default": false },
    checkedByUser: { type: Boolean, "default": false },
    status: { type: String, "default": "waiting" },
    smallRooms: { type: Number, "default": 1 },
    bigRooms: { type: Number, "default": 1 },
    bathrooms: { type: Number, "default": 1 },
    price: { type: Number, required: true, "default": 1 },
    time: { type: Number, required: true, "default": 1 }
});
var Order = mongoose.model("Order", orderSchema);
module.exports = Order;
