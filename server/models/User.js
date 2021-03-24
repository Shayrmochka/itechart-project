"use strict";
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false,
        "default": "https://static-cdn.jtvnw.net/jtv_user_pictures/54a8a787-4619-4b1f-a0ca-03ffac31b0a6-profile_image-300x300.png"
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    links: [{ type: mongoose.Types.ObjectId, ref: "Link" }]
});
var User = mongoose.model("User", userSchema);
module.exports = User;
