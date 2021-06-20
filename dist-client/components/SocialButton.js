"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/jsx-props-no-spreading */
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_social_login_1 = __importDefault(require("react-social-login"));
var core_1 = require("@material-ui/core");
function SocialButton(props) {
    var children = props.children, triggerLogin = props.triggerLogin, other = __rest(props, ["children", "triggerLogin"]);
    return (react_1.default.createElement(core_1.Button, __assign({ fullWidth: true, variant: "outlined", color: "secondary", onClick: triggerLogin }, other), children));
}
SocialButton.propTypes = {
    children: prop_types_1.default.string.isRequired,
    triggerLogin: prop_types_1.default.func.isRequired,
};
exports.default = react_social_login_1.default(SocialButton);
