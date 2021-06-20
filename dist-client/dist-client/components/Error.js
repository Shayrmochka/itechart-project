"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
function Error(_a) {
    var error = _a.error;
    return (react_1.default.createElement("div", null, react_1.default.createElement("h1", null, "Error Page"), react_1.default.createElement("p", null, error.toString())));
}
Error.propTypes = {
    error: prop_types_1.default.string.isRequired,
};
exports.default = Error;
