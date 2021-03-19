"use strict";
var mongoose = require("mongoose");
var cleaningCompanySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    typeOfServices: {
        type: String,
        required: true
    },
    priceList: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});
var cleaningCompany = mongoose.model("CleaningCompany", cleaningCompanySchema);
module.exports = cleaningCompany;
