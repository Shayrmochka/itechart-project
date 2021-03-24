import mongoose = require("mongoose");

interface ICleaningService extends mongoose.Document {
  typeOfService: string;
  numberOfService: number;
  serviceImage: string;
}

var cleaningServiceSchema = new mongoose.Schema({
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
});

var CleaningService = mongoose.model<ICleaningService>(
  "CleaningService",
  cleaningServiceSchema
);

export = CleaningService;
