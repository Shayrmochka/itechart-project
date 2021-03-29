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
var bcrypt = require("bcryptjs");
var _a = require("express-validator"), check = _a.check, body = _a.body, validationResult = _a.validationResult;
var User = require("../models/User");
var CleaningCompany = require("../models/CleaningCompany");
var router = Router();
var ROLES = require("../roles/roles");
var _b = require("../middleware/auth.middleware"), auth = _b.auth, signToken = _b.signToken, hashPassword = _b.hashPassword, verifyPassword = _b.verifyPassword, checkIsInRole = _b.checkIsInRole, getRedirectUrl = _b.getRedirectUrl, checkToken = _b.checkToken;
// /api/auth/check
router.post("/check", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, decoded, user, company, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            message: "Invalid token"
                        })];
                }
                decoded = checkToken(req.body.data);
                if (!(decoded.accountOwner === "user")) return [3 /*break*/, 2];
                return [4 /*yield*/, User.findById(decoded.dataId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: "User not found" })];
                }
                if (!user.isActive) {
                    return [2 /*return*/, res.status(400).json({ message: "The user is banned" })];
                }
                res.json(user);
                return [3 /*break*/, 4];
            case 2:
                if (!(decoded.accountOwner === "company")) return [3 /*break*/, 4];
                return [4 /*yield*/, CleaningCompany.findById(decoded.dataId)];
            case 3:
                company = _a.sent();
                if (!company) {
                    return [2 /*return*/, res.status(400).json({ message: "Company not found" })];
                }
                if (!company.isActive) {
                    return [2 /*return*/, res.status(400).json({ message: "The company is banned" })];
                }
                res.json(company);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// /api/auth/register
router.post("/register", [
    check("email", "Email is incorrect").isEmail(),
    check("password", "Password min length must be 6 symbols").isLength({
        min: 6
    }),
    check("firstName", "First Name is too short").isLength({
        min: 1
    }),
    check("lastName", "Last Name is too short").isLength({
        min: 1
    }),
    check("phone", "Last Name is too short").isLength({
        min: 6
    }),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, firstName, lastName, phone, candidate, hashedPassword, user, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                errors = validationResult(req);
                console.log(errors);
                if (!errors.isEmpty() || req.body.password !== req.body.confirmPassword) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            message: "The registration data is incorrect"
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, phone = _a.phone;
                return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                candidate = _b.sent();
                if (candidate) {
                    return [2 /*return*/, res.status(400).json({ message: "This user already exists" })];
                }
                return [4 /*yield*/, hashPassword(password)];
            case 2:
                hashedPassword = _b.sent();
                user = new User({
                    email: email,
                    password: hashedPassword,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    isActive: true,
                    role: ROLES.User
                });
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                res.status(201).json({ message: "User created" });
                return [3 /*break*/, 5];
            case 4:
                e_2 = _b.sent();
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// /api/auth/login
router.post("/login", [
    check("email", "Email is incorrect").normalizeEmail().isEmail(),
    check("password", "Enter the password").exists(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, isMatch, token, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            message: "Invalid login data"
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                user = _b.sent();
                //console.log("Login:", user);
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: "User not found" })];
                }
                if (!user.isActive) {
                    return [2 /*return*/, res.status(400).json({ message: "The user is banned" })];
                }
                return [4 /*yield*/, verifyPassword(password, user.password)];
            case 2:
                isMatch = _b.sent();
                console.log(isMatch);
                if (!isMatch) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Invalid password, please try again" })];
                }
                return [4 /*yield*/, signToken(user.id, "user")];
            case 3:
                token = _b.sent();
                // res.json({ token, userId: user.id });
                res.json({ token: token, user: user });
                return [3 /*break*/, 5];
            case 4:
                e_3 = _b.sent();
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post("/register-company", [
    check("email", "Email is incorrect").isEmail(),
    check("password", "Password min length must be 6 symbols").isLength({
        min: 6
    }),
    check("name", "Name is too short").isLength({
        min: 1
    }),
    check("address", "Address is too short").isLength({
        min: 1
    }),
    // check('confirmPassword').custom(  (value: any, req: any) => {
    //   if (value !== req.body.password) {
    //     throw new Error('Password confirmation does not match password');
    //   }
    //   return true;
    // }),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, logo, name_1, description, address, typeOfServices, priceList, candidate, hashedPassword, company, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // res.set("Access-Control-Allow-Origin", "*");
                console.log("REQ111", req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                errors = validationResult(req);
                if (!errors.isEmpty() || req.body.password !== req.body.confirmPassword) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            message: "The registration data is incorrect"
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password, logo = _a.logo, name_1 = _a.name, description = _a.description, address = _a.address, typeOfServices = _a.typeOfServices, priceList = _a.priceList;
                return [4 /*yield*/, CleaningCompany.findOne({ email: email })];
            case 2:
                candidate = _b.sent();
                if (candidate) {
                    return [2 /*return*/, res.status(400).json({ message: "This Company already exist" })];
                }
                return [4 /*yield*/, bcrypt.hash(password, 12)];
            case 3:
                hashedPassword = _b.sent();
                company = new CleaningCompany({
                    email: email,
                    password: hashedPassword,
                    logo: logo,
                    name: name_1,
                    description: description,
                    address: address,
                    // typeOfServices,
                    priceList: priceList,
                    rating: 0,
                    isActive: true
                });
                return [4 /*yield*/, company.save()];
            case 4:
                _b.sent();
                res.status(201).json({ message: "Company created" });
                return [3 /*break*/, 6];
            case 5:
                e_4 = _b.sent();
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// /api/auth/login
router.post("/login-company", [
    check("email", "Email is incorrect").normalizeEmail().isEmail(),
    check("password", "Password min length must be 6 symbols").exists(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, company, isMatch, token, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            message: "Invalid login data"
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, CleaningCompany.findOne({ email: email })];
            case 1:
                company = _b.sent();
                if (!company) {
                    return [2 /*return*/, res.status(400).json({ message: "Company not found" })];
                }
                if (!company.isActive) {
                    return [2 /*return*/, res.status(400).json({ message: "The Company is banned" })];
                }
                return [4 /*yield*/, verifyPassword(password, company.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Invalid password, please try again" })];
                }
                return [4 /*yield*/, signToken(company.id, "company")];
            case 3:
                token = _b.sent();
                res.json({ token: token, company: company });
                return [3 /*break*/, 5];
            case 4:
                e_5 = _b.sent();
                res.status(500).json({ message: "Something went wrong, try again" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
