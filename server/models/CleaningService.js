"use strict";
var mongoose = require("mongoose");
var cleaningServiceSchema = new mongoose.Schema({
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
    }
});
var CleaningService = mongoose.model("CleaningService", cleaningServiceSchema);
module.exports = CleaningService;
