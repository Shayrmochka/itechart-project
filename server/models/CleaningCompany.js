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
        required: true,
        "default": "../images/default-company.png"
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
    // typeOfServices: [
    //   {
    //     type: String,
    //     required: false,
    //   },
    // ],
    priceList: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        "default": 0
    },
    isActive: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true,
        "default": "company"
    },
    typeOfServices: [{ type: mongoose.Types.ObjectId, ref: "CleaningService" }]
});
var cleaningCompany = mongoose.model("CleaningCompany", cleaningCompanySchema);
module.exports = cleaningCompany;
