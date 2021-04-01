import mongoose = require("mongoose");

interface ICleaningService extends mongoose.Document {
  serviceName: string;
  typeOfService: string;
  numberOfService: number;
  serviceImage: string;
  serviceDescription: string;
  servicePrice: number;
}

var cleaningServiceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  typeOfService: {
    type: String,
    required: true,
  },
  numberOfService: {
    type: Number,
    required: true,
  },
  serviceImage: {
    type: String,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  servicePrice: {
    type: Number,
    required: true,
    default: 1,
  },
});

var CleaningService = mongoose.model<ICleaningService>(
  "CleaningService",
  cleaningServiceSchema
);

export = CleaningService;
