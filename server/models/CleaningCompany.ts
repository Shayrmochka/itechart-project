import mongoose = require("mongoose");

interface ICleaningCompany extends mongoose.Document {
  email: string;
  password: string;
  logo: string;
  name: string;
  description: string;
  address: string;
  typeOfServices: string;
  priceList: string;
  isActive: boolean;
}

const cleaningCompanySchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  typeOfServices: {
    type: String,
    required: true,
  },
  priceList: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  //   links: [{ type: mongoose.Types.ObjectId, ref: "Link" }],
  // 	links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
});

var cleaningCompany = mongoose.model<ICleaningCompany>(
  "CleaningCompany",
  cleaningCompanySchema
);

export = cleaningCompany;
