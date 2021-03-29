import mongoose = require("mongoose");

interface ICleaningCompany extends mongoose.Document {
  email: string;
  password: string;
  logo: string;
  name: string;
  description: string;
  address: string;
  typeOfServices: any;
  priceList: string;
  rating: number;
  isActive: boolean;
  type: string;
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
  // typeOfServices: [
  //   {
  //     type: String,
  //     required: false,
  //   },
  // ],
  priceList: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "company",
  },

  typeOfServices: [{ type: mongoose.Types.ObjectId, ref: "CleaningServices" }],
  // 	links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
});

var cleaningCompany = mongoose.model<ICleaningCompany>(
  "CleaningCompany",
  cleaningCompanySchema
);

export = cleaningCompany;
