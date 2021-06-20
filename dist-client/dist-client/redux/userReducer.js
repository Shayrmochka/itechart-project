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
    currentUser: {},
    isAuthenticated: false,
};
var userReducer = function (state, action) {
    if (state === void 0) {
        state = initialState;
    }
    switch (action.type) {
        case types_1.GET_CURRENT_USER:
            return __assign(__assign({}, state), { currentUser: __assign(__assign({}, state.currentUser), action.payload), isAuthenticated: true });
        case types_1.REMOVE_CURRENT_USER:
            return __assign(__assign({}, state), { currentUser: {}, isAuthenticated: false });
        case types_1.GET_USER_AUTHENTICATION:
            return __assign(__assign({}, state), { isAuthenticated: action.payload });
        default:
            return state;
    }
};
exports.default = userReducer;
