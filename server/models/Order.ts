import mongoose = require("mongoose");

interface IOrder extends mongoose.Document {
  date: string;
  dateCleaning: string;
  owner: string;
  ownerLogo: string;
  ownerEmail: string;
  orderTo: string;
  companyLogo: string;
  address: string;
  serviceName: string;
  typeOfService: string;
  flatDescription: string;
  checked: boolean;
  checkedByUser: boolean;
  status: string;
}

var orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  dateCleaning: { type: Date },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  ownerLogo: { type: String },
  ownerEmail: { type: String },
  orderTo: { type: mongoose.Types.ObjectId, ref: "CleaningCompany" },
  companyLogo: { type: String },
  address: { type: String },
  serviceName: { type: String },
  typeOfService: { type: String },
  flatDescription: { type: String },
  checked: { type: Boolean, default: false },
  checkedByUser: { type: Boolean, default: false },
  status: { type: String, default: "waiting" },
});

var Order = mongoose.model<IOrder>("Order", orderSchema);

export = Order;
