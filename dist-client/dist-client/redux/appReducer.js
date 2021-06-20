"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var initialState = {
    isLoading: false,
};
var appReducer = function (state, action) {
    if (state === void 0) {
        state = initialState;
    }
    switch (action.type) {
        case types_1.SHOW_LOADER:
            return __assign(__assign({}, state), { isLoading: true });
        case types_1.HIDE_LOADER:
            return __assign(__assign({}, state), { isLoading: false });
        default:
            return state;
    }
};
exports.default = appReducer;
