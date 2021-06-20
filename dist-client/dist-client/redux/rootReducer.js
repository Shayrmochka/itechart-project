"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var appReducer_1 = __importDefault(require("./appReducer"));
var userReducer_1 = __importDefault(require("./userReducer"));
var ordersReducer_1 = __importDefault(require("./ordersReducer"));
var companyReducer_1 = __importDefault(require("./companyReducer"));
var rootReducer = redux_1.combineReducers({
    user: userReducer_1.default,
    orders: ordersReducer_1.default,
    app: appReducer_1.default,
    company: companyReducer_1.default,
});
exports.default = rootReducer;
