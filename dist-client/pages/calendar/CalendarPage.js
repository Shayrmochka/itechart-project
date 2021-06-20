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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var react_redux_1 = require("react-redux");
function CalendarPage() {
    var acceptedOrders = react_redux_1.useSelector(function (state) { return state.orders.acceptedOrders; });
    var formatOrders = function (orders) {
        var formated = orders.map(function (e) { return (__assign(__assign({}, e), { StartTime: new Date(e.dateCleaning), EndTime: new Date(new Date(e.dateCleaning).getTime() + e.time * 60000), Id: e._id, IsAllDay: false, Subject: e.serviceName, Priority: 'High', Location: e.address, Description: e.owner.firstName + " " + e.owner.lastName + ": " + e.flatDescription + " (" + e.price + "$)" })); });
        return formated;
    };
    return (react_1.default.createElement(ej2_react_schedule_1.ScheduleComponent, { width: "100%", height: "550px", currentView: "Month", eventSettings: { dataSource: formatOrders(acceptedOrders) } },
        react_1.default.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda] })));
}
exports.default = CalendarPage;
