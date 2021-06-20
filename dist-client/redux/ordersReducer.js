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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var initialState = {
    allOrders: [],
    sortedOrders: [],
    acceptedOrders: [],
};
var ordersReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.GET_ORDERS:
            return __assign(__assign({}, state), { allOrders: __spreadArray([], action.payload) });
        case types_1.REMOVE_ORDERS:
            return { allOrders: [] };
        case types_1.GET_SORTED_ORDERS:
            return __assign(__assign({}, state), { sortedOrders: __spreadArray([], action.payload) });
        case types_1.REMOVE_SORTED_ORDERS:
            return { sortedOrders: [] };
        case types_1.GET_ACCEPTED_ORDERS:
            return __assign(__assign({}, state), { acceptedOrders: __spreadArray([], action.payload) });
        case types_1.REMOVE_ACCEPTED_ORDERS:
            return { acceptedOrders: [] };
        default:
            return state;
    }
};
exports.default = ordersReducer;
