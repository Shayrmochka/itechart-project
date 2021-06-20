"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var HomePage_1 = __importDefault(require("./pages/main-page/HomePage"));
var SignIn = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/auth-pages/SignIn')); }); });
var SignUp = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/auth-pages/SignUp')); }); });
var SignInCompany = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/auth-pages/SignInCompany')); }); });
var SignUpCompany = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/auth-pages/SignUpCompany')); }); });
var DetailCompanyPage = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/companies/DetailCompanyPage')); }); });
var CompaniesPage = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/companies/CompaniesPage')); }); });
var UsersPage = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/users/UsersPage')); }); });
var CreateOrderPage = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/orders/CreateOrderPage')); }); });
var UserProfile = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/profile/UserProfile')); }); });
var CalendarPage = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/calendar/CalendarPage')); }); });
var ContactUs = react_1.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./pages/contact-us/ContactUs')); }); });
var useRoutes = function (isAuthenticated, logout) {
    if (isAuthenticated) {
        return (react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/home", exact: true },
                react_1.default.createElement(HomePage_1.default, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/profile", exact: true },
                react_1.default.createElement(UserProfile, { logout: logout })),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/users", exact: true },
                react_1.default.createElement(UsersPage, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/companies", exact: true },
                react_1.default.createElement(CompaniesPage, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/create-order", exact: true },
                react_1.default.createElement(CreateOrderPage, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/company-detail/:id" },
                react_1.default.createElement(DetailCompanyPage, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/calendar" },
                react_1.default.createElement(CalendarPage, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/contactus", exact: true },
                react_1.default.createElement(ContactUs, null)),
            react_1.default.createElement(react_router_dom_1.Redirect, { to: "/home" })));
    }
    return (react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/home", exact: true },
            react_1.default.createElement(HomePage_1.default, null)),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/signin", exact: true },
            react_1.default.createElement(SignIn, null)),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/signup", exact: true },
            react_1.default.createElement(SignUp, null)),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/signin-company", exact: true },
            react_1.default.createElement(SignInCompany, null)),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/signup-company", exact: true },
            react_1.default.createElement(SignUpCompany, null)),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/companies", exact: true },
            react_1.default.createElement(CompaniesPage, null)),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/create-order", exact: true },
            react_1.default.createElement(CreateOrderPage, null)),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/company-detail/:id" },
            react_1.default.createElement(DetailCompanyPage, null)),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/contactus", exact: true },
            react_1.default.createElement(ContactUs, null)),
        react_1.default.createElement(react_router_dom_1.Redirect, { to: "/home" })));
};
exports.default = useRoutes;
