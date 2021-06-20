"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Checkout_1 = __importDefault(require("../../components/orders/checkout-forms/Checkout"));
function CreateOrderPage() {
    return (react_1.default.createElement("div", null, react_1.default.createElement(Checkout_1.default, null)));
}
exports.default = CreateOrderPage;
