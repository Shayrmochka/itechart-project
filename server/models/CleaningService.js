"use strict";
var mongoose = require("mongoose");
var cleaningServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    typeOfService: {
        type: String,
        required: true
    },
    numberOfService: {
        type: Number,
        required: true
    },
    serviceImage: {
        type: String,
        required: true
    },
    serviceDescription: {
        type: String,
        required: true
    }
});
var CleaningService = mongoose.model("CleaningService", cleaningServiceSchema);
module.exports = CleaningService;
