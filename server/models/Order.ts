import mongoose = require("mongoose");

interface IOrder extends mongoose.Document {
  date: string;
  owner: string;
}

var orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
});

var Order = mongoose.model<IOrder>("Order", orderSchema);

export = Order;
