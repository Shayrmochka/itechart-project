"use strict";
var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
    date: { type: Date, "default": Date.now },
    owner: { type: mongoose.Types.ObjectId, ref: "User" }
});
var Order = mongoose.model("Order", orderSchema);
module.exports = Order;
