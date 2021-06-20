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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var initialState = {
    chosenCompany: {},
};
var companyReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.GET_CHOSEN_COMPANY:
            return __assign(__assign({}, state), { chosenCompany: __assign(__assign({}, state.chosenCompany), action.payload) });
        case types_1.REMOVE_CHOSEN_COMPANY:
            return { chosenCompany: {} };
        default:
            return state;
    }
};
exports.default = companyReducer;
