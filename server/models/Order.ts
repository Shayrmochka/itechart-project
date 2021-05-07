import mongoose = require("mongoose");

interface IOrder extends mongoose.Document {
  date: string;
  dateCleaning: string;
  owner: string;
  company: string;
  address: string;
  serviceName: string;
  typeOfService: string;
  flatDescription: string;
  checked: boolean;
  checkedByUser: boolean;
  status: string;
  smallRooms: number;
  bigRooms: number;
  bathrooms: number;
  price: number;
  time: number;
}

const orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  dateCleaning: { type: Date },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  company: { type: mongoose.Types.ObjectId, ref: "CleaningCompany" },
  address: { type: String },
  serviceName: { type: String },
  typeOfService: { type: String },
  flatDescription: { type: String },
  checked: { type: Boolean, default: false },
  checkedByUser: { type: Boolean, default: false },
  status: { type: String, default: "waiting" },
  smallRooms: { type: Number, default: 1 },
  bigRooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  price: { type: Number, required: true, default: 1 },
  time: { type: Number, required: true, default: 1 },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export = Order;
