import mongoose from 'mongoose';

export interface ICleaningCompany extends mongoose.Document {
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
  banReason: string;
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
    default: '../images/default-company.png',
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
  banReason: {
    type: String,
    default: 'Without reason',
  },
  type: {
    type: String,
    required: true,
    default: 'company',
  },

  typeOfServices: [{ type: mongoose.Types.ObjectId, ref: 'CleaningService' }],
});

export const CleaningCompany = mongoose.model<ICleaningCompany>(
  'CleaningCompany',
  cleaningCompanySchema,
);
