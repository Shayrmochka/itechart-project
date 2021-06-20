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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_swipeable_views_1 = __importDefault(require("react-swipeable-views"));
var styles_1 = require("@material-ui/core/styles");
var AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
var Tabs_1 = __importDefault(require("@material-ui/core/Tabs"));
var Tab_1 = __importDefault(require("@material-ui/core/Tab"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var UsersList_1 = __importDefault(require("../../components/users/UsersList"));
var Loader_1 = __importDefault(require("../../components/Loader"));
var http_hook_1 = __importDefault(require("../../hooks/http.hook"));
var AdminCompaniesList_1 = __importDefault(require("../../components/companies/AdminCompaniesList"));
var message_hook_1 = __importDefault(require("../../hooks/message.hook"));
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (react_1.default.createElement("div", __assign({ role: "tabpanel", hidden: value !== index, id: "full-width-tabpanel-" + index, "aria-labelledby": "full-width-tab-" + index }, other), value === index && (react_1.default.createElement(Box_1.default, { p: 3 }, react_1.default.createElement(Typography_1.default, null, children)))));
}
TabPanel.propTypes = {
    children: prop_types_1.default.shape().isRequired,
    value: prop_types_1.default.number.isRequired,
    index: prop_types_1.default.number.isRequired,
    other: prop_types_1.default.shape(),
};
TabPanel.defaultProps = {
    other: undefined,
};
// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        rootWrapper: {
            display: 'flex',
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
        },
        root: {
            backgroundColor: theme.palette.background.paper,
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
        },
        appBar: {
            marginTop: '64px',
            margin: '0 auto',
        },
        views: {
            marginTop: '40px',
        },
        tabs: {
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
        },
    });
});
function UsersPage() {
    var _this = this;
    var classes = useStyles();
    var theme = styles_1.useTheme();
    var _a = react_1.useState(0), value = _a[0], setValue = _a[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    var handleChangeIndex = function (index) {
        setValue(index);
    };
    var _b = react_1.useState([]), users = _b[0], setUsers = _b[1];
    var _c = react_1.useState([]), companies = _c[0], setCompanies = _c[1];
    var _d = http_hook_1.default(), loading = _d.loading, request = _d.request;
    var message = message_hook_1.default();
    var _e = react_1.useState(false), userBan = _e[0], setUserBan = _e[1];
    var handleUserBan = function () {
        setUserBan(true);
    };
    var handleUserBanClose = function () {
        setUserBan(false);
    };
    var fetchUsers = react_1.useCallback(function () {
        return __awaiter(_this, void 0, void 0, function () {
            var fetchedUsers, fetchedCompanies, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, request('/api/user', 'GET', null)];
                    case 1:
                        fetchedUsers = _a.sent();
                        setUsers(fetchedUsers);
                        return [4 /*yield*/, request('/api/company', 'GET', null)];
                    case 2:
                        fetchedCompanies = _a.sent();
                        setCompanies(fetchedCompanies);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        message(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }, [message, request]);
    react_1.useEffect(function () {
        fetchUsers();
        return function () { return undefined; };
    }, [fetchUsers]);
    if (loading) {
        return react_1.default.createElement(Loader_1.default, null);
    }
    return (react_1.default.createElement("div", { className: classes.rootWrapper }, react_1.default.createElement("div", { className: classes.root }, react_1.default.createElement(AppBar_1.default, { color: "default", className: classes.appBar }, react_1.default.createElement(Tabs_1.default, { value: value, onChange: handleChange, indicatorColor: "primary", textColor: "primary", className: classes.tabs }, react_1.default.createElement(Tab_1.default, __assign({ label: "Users" }, { id: "full-width-tab-" + 0, 'aria-controls': "full-width-tabpanel-" + 0 })), react_1.default.createElement(Tab_1.default, __assign({ label: "Companies" }, { id: "full-width-tab-" + 1, 'aria-controls': "full-width-tabpanel-" + 1 })))), react_1.default.createElement(react_swipeable_views_1.default, { axis: theme.direction === 'rtl' ? 'x-reverse' : 'x', index: value, onChangeIndex: handleChangeIndex, className: classes.views }, react_1.default.createElement(TabPanel, { value: value, index: 0, dir: theme.direction }, !loading && (react_1.default.createElement(UsersList_1.default, { users: users, open: userBan, handleClickOpen: handleUserBan, handleClose: handleUserBanClose }))), react_1.default.createElement(TabPanel, { value: value, index: 1, dir: theme.direction }, !loading && (react_1.default.createElement(AdminCompaniesList_1.default, { companies: companies, open: userBan, handleClickOpen: handleUserBan, handleClose: handleUserBanClose })))))));
}
exports.default = UsersPage;
