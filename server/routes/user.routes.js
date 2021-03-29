"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Router = require("express").Router;
var User = require("../models/User");
var Order = require("../models/Order");
var Feedback = require("../models/Feedback");
var _a = require("../middleware/auth.middleware"), auth = _a.auth, signToken = _a.signToken, hashPassword = _a.hashPassword, verifyPassword = _a.verifyPassword, checkIsInRole = _a.checkIsInRole, getRedirectUrl = _a.getRedirectUrl;
var _b = require("express-validator"), check = _b.check, body = _b.body, validationResult = _b.validationResult;
var ROLES = require("../roles/roles");
var router = Router();
router.get("/", auth, checkIsInRole(ROLES.Admin), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.find({})];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findById(req.params.id)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/update", auth, checkIsInRole(ROLES.Admin), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User.findById(req.body._id)];
            case 1:
                user = _a.sent();
                user.isActive = !user.isActive;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.status(201).json({ user: user });
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post("/edit-profile", auth, [
    check("password", "Password min length must be 6 symbols").isLength({
        min: 6
    }),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, operationType, _a, firstName, lastName, email, phone, _id, _b, oldPassword, password, confirmPassword, errors, verifiedPass, newPassword, e_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                return [4 /*yield*/, User.findById(req.body._id)];
            case 1:
                user = _c.sent();
                operationType = req.body.operationType;
                if (!(operationType === "profile")) return [3 /*break*/, 2];
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, phone = _a.phone, _id = _a._id;
                if (user.isActive) {
                    user.firstName = firstName;
                    user.lastName = lastName;
                    user.email = email;
                    user.phone = phone;
                }
                return [3 /*break*/, 5];
            case 2:
                if (!(operationType === "password")) return [3 /*break*/, 5];
                _b = req.body, oldPassword = _b.oldPassword, password = _b.password, confirmPassword = _b.confirmPassword;
                if (!user.isActive) return [3 /*break*/, 5];
                errors = validationResult(req);
                console.log(errors);
                if (!errors.isEmpty() ||
                    req.body.password !== req.body.confirmPassword) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            message: "The registration data is incorrect"
                        })];
                }
                return [4 /*yield*/, verifyPassword(oldPassword, user.password)];
            case 3:
                verifiedPass = _c.sent();
                console.log(verifiedPass);
                if (!verifiedPass) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Invalid password, please try again" })];
                }
                return [4 /*yield*/, hashPassword(password)];
            case 4:
                newPassword = _c.sent();
                user.password = newPassword;
                _c.label = 5;
            case 5: return [4 /*yield*/, user.save()];
            case 6:
                _c.sent();
                res.status(201).json(user);
                return [3 /*break*/, 8];
            case 7:
                e_4 = _c.sent();
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
router.post("/delete-profile", auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, feedbacks, orders, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.body._id;
                return [4 /*yield*/, User.findById(id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, Feedback.find({ owner: id })];
            case 2:
                feedbacks = _a.sent();
                return [4 /*yield*/, Order.find({ owner: id })];
            case 3:
                orders = _a.sent();
                console.log("USER", user);
                console.log("FEEDBACKS", feedbacks);
                console.log("ORDERS", orders);
                if (feedbacks.length) {
                    feedbacks.forEach(function (feedback) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Feedback.deleteOne({ _id: feedback._id })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                if (orders.length) {
                    orders.forEach(function (feedback) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Order.deleteOne({ _id: feedback._id })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [4 /*yield*/, User.deleteOne({ _id: id })];
            case 4:
                _a.sent();
                res.status(201).json({ message: "User deleted" });
                return [3 /*break*/, 6];
            case 5:
                e_5 = _a.sent();
                console.log(e_5);
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
