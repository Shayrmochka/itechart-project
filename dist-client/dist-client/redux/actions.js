"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeChosenCompany = exports.getChosenCompany = exports.removeAcceptedOrders = exports.removeSortedOrders = exports.removeOrders = exports.fetchOrders = exports.hideLoader = exports.showLoader = exports.getUserAuthentication = exports.removeCurrentUser = exports.getCurrentUser = void 0;
var api_1 = __importDefault(require("../api/api"));
var types_1 = require("./types");
// USER
function getCurrentUser(currentUser) {
    return {
        type: types_1.GET_CURRENT_USER,
        payload: currentUser,
    };
}
exports.getCurrentUser = getCurrentUser;
function removeCurrentUser() {
    return {
        type: types_1.REMOVE_CURRENT_USER,
    };
}
exports.removeCurrentUser = removeCurrentUser;
function getUserAuthentication(isAuthenticated) {
    return {
        type: types_1.GET_USER_AUTHENTICATION,
        payload: isAuthenticated,
    };
}
exports.getUserAuthentication = getUserAuthentication;
// APP
function showLoader() {
    return {
        type: types_1.SHOW_LOADER,
    };
}
exports.showLoader = showLoader;
function hideLoader() {
    return {
        type: types_1.HIDE_LOADER,
    };
}
exports.hideLoader = hideLoader;
// ORDERS
function fetchOrders(user, message) {
    var _this = this;
    var getSortedOrders = function (orders) {
        if (user.type === 'user') {
            return orders.filter(function (order) { return order.status !== 'waiting'; });
        }
        if (user.type === 'company') {
            return orders.filter(function (order) { return !order.checked; });
        }
        return orders;
    };
    var getAcceptedOrders = function (orders) { return orders.filter(function (order) { return order.status === 'accepted'; }); };
    return function (dispatch) {
        return __awaiter(_this, void 0, void 0, function () {
            var orders, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1.default.get('/api/order', user.token)];
                    case 1:
                        orders = _a.sent();
                        if (typeof orders !== 'object') {
                            throw new Error('Bad response');
                        }
                        dispatch({ type: types_1.GET_ORDERS, payload: orders });
                        dispatch({
                            type: types_1.GET_SORTED_ORDERS,
                            payload: getSortedOrders(orders),
                        });
                        dispatch({
                            type: types_1.GET_ACCEPTED_ORDERS,
                            payload: getAcceptedOrders(orders),
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        message(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
}
exports.fetchOrders = fetchOrders;
function removeOrders() {
    return {
        type: types_1.REMOVE_ORDERS,
    };
}
exports.removeOrders = removeOrders;
function removeSortedOrders() {
    return {
        type: types_1.REMOVE_SORTED_ORDERS,
    };
}
exports.removeSortedOrders = removeSortedOrders;
function removeAcceptedOrders() {
    return {
        type: types_1.REMOVE_ACCEPTED_ORDERS,
    };
}
exports.removeAcceptedOrders = removeAcceptedOrders;
// COMPANY
function getChosenCompany(company) {
    return {
        type: types_1.GET_CHOSEN_COMPANY,
        payload: company,
    };
}
exports.getChosenCompany = getChosenCompany;
function removeChosenCompany() {
    return {
        type: types_1.REMOVE_CHOSEN_COMPANY,
    };
}
exports.removeChosenCompany = removeChosenCompany;
