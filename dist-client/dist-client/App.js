"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
var react_redux_1 = require("react-redux");
var Loader_1 = __importDefault(require("./components/Loader"));
var NavBar_1 = __importDefault(require("./components/NavBar"));
var auth_hooh_1 = __importDefault(require("./hooks/auth.hooh"));
var routes_1 = __importDefault(require("./routes"));
var actions_1 = require("./redux/actions");
var message_hook_1 = __importDefault(require("./hooks/message.hook"));
var useStyles = core_1.makeStyles(function () {
    return ({
        root: {
            backgroundColor: '#fafafa',
        },
    });
});
function App() {
    var classes = useStyles();
    var dispatch = react_redux_1.useDispatch();
    var logout = auth_hooh_1.default().logout;
    var message = message_hook_1.default();
    var isLoading = react_redux_1.useSelector(function (state) { return state.app.isLoading; });
    var user = react_redux_1.useSelector(function (state) { return state.user.currentUser; });
    var orders = react_redux_1.useSelector(function (state) { return state.orders; });
    var isAuthenticated = react_redux_1.useSelector(function (state) { return state.user.isAuthenticated; });
    var routes = routes_1.default(isAuthenticated, logout);
    react_1.useEffect(function () {
        if (isAuthenticated) {
            dispatch(actions_1.fetchOrders(user, message));
        }
    }, [isAuthenticated, user, dispatch, message]);
    if (isLoading) {
        return react_1.default.createElement(Loader_1.default, null);
    }
    return (react_1.default.createElement("div", { className: classes.root }, react_1.default.createElement(react_router_dom_1.BrowserRouter, null, react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(Loader_1.default, null) }, react_1.default.createElement(NavBar_1.default, { currentUser: user, isAuthenticated: isAuthenticated, logout: logout, orders: orders.allOrders, sortedOrders: orders.sortedOrders, ordersSortedByAccepted: orders.acceptedOrders }), routes))));
}
exports.default = App;
