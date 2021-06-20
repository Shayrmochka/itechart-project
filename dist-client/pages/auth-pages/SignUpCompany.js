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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var LockOutlined_1 = __importDefault(require("@material-ui/icons/LockOutlined"));
var styles_1 = require("@material-ui/core/styles");
var react_hook_form_1 = require("react-hook-form");
var react_router_dom_1 = require("react-router-dom");
var http_hook_1 = __importDefault(require("../../hooks/http.hook"));
var message_hook_1 = __importDefault(require("../../hooks/message.hook"));
var ServicesBlock_1 = __importDefault(require("../../components/auth-pages/ServicesBlock"));
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: 'red',
    },
    linksBlock: {
        background: '#c5c7ce',
        width: '100%',
        textAlign: 'center',
        borderRadius: '4px',
        padding: '8px 16px',
        textTransform: 'uppercase',
        fontWeight: 500,
        marginBottom: '10px',
    },
    links: {
        color: 'white',
        textDecoration: 'none',
    },
}); });
function SignUp() {
    var _this = this;
    var _a = react_hook_form_1.useForm(), register = _a.register, handleSubmit = _a.handleSubmit, errors = _a.errors;
    var classes = useStyles();
    var message = message_hook_1.default();
    var _b = http_hook_1.default(), loading = _b.loading, request = _b.request;
    var _c = react_1.useState({
        email: '',
        password: '',
    }), form = _c[0], setForm = _c[1];
    var _d = react_1.useState([]), services = _d[0], setServices = _d[1];
    var fetchServices = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var getChecked, fetched, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getChecked = function (e, checked) { return (__assign(__assign({}, e), { checked: checked })); };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, request('/api/service', 'GET', null)];
                case 2:
                    fetched = _a.sent();
                    data = fetched.map(function (e, i) { return (i === 0 ? getChecked(true) : getChecked(false)); });
                    setServices(data);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    message(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [message, request]);
    react_1.useEffect(function () {
        fetchServices();
    }, [fetchServices]);
    var onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request('/api/auth/register-company', 'POST', __assign(__assign({}, form), { services: services }))];
                case 1:
                    data = _a.sent();
                    message(data.message);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    message(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var changeHandler = function (event) {
        var _a;
        setForm(__assign(__assign({}, form), (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var handleChangeServices = function (targetService) {
        var service = targetService;
        service.checked = !service.checked;
        setServices(services.map(function (e) { return (e._id === service._id ? service : e); }));
    };
    return (react_1.default.createElement(core_1.Container, { component: "main", maxWidth: "xs" },
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("div", { className: classes.paper },
            react_1.default.createElement(core_1.Avatar, { className: classes.avatar },
                react_1.default.createElement(LockOutlined_1.default, null)),
            react_1.default.createElement(core_1.Typography, { component: "h1", variant: "h5" }, "Sign up for Companies"),
            react_1.default.createElement("form", { className: classes.form, noValidate: true, onSubmit: handleSubmit(onSubmit) },
                react_1.default.createElement(react_router_dom_1.NavLink, { className: classes.links, to: "/signup" },
                    react_1.default.createElement("div", { className: classes.linksBlock }, "I'm User")),
                react_1.default.createElement(core_1.Grid, { container: true, spacing: 2 },
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12 },
                        react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, id: "name", label: "Company Name", name: "name", autoComplete: "name", onChange: changeHandler, inputRef: register({ required: true }), error: !!errors.name }),
                        errors.name && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))),
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12 },
                        react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, id: "description", label: "Company Description", name: "description", autoComplete: "description", onChange: changeHandler, inputRef: register({ required: true }), error: !!errors.description }),
                        errors.description && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))),
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12 },
                        react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, id: "address", label: "Address", name: "address", autoComplete: "address", onChange: changeHandler, inputRef: register({ required: true }), error: !!errors.address }),
                        errors.address && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))),
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12 },
                        react_1.default.createElement(ServicesBlock_1.default, { handleChangeServices: handleChangeServices, services: services })),
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12 },
                        react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, id: "priceList", label: "Price List", name: "priceList", autoComplete: "priceList", onChange: changeHandler, inputRef: register({ required: true }), error: !!errors.priceList }),
                        errors.priceList && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))),
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12 },
                        react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", onChange: changeHandler, inputRef: register({
                                required: 'You must provide the email address!',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'You must provide a valid email address!',
                                    // value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\
                                    // .,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.
                                    // [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                },
                            }), error: !!errors.email }),
                        errors.email && (react_1.default.createElement("span", { className: classes.error }, errors.email.message))),
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12 },
                        react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", onChange: changeHandler, autoComplete: "current-password", inputRef: register({
                                required: 'You must provide a password.',
                                minLength: {
                                    value: 6,
                                    message: 'Your password must be greater than 6 characters',
                                },
                            }), error: !!errors.password }),
                        errors.password && (react_1.default.createElement("span", { className: classes.error }, errors.password.message))),
                    react_1.default.createElement(core_1.Grid, { item: true, xs: 12 },
                        react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, name: "confirmPassword", label: "Confirm Password", type: "password", id: "confirm-password", autoComplete: "current-password", onChange: changeHandler, inputRef: register({
                                required: 'You must provide a password.',
                                minLength: {
                                    value: 6,
                                    message: 'Your password must be greater than 6 characters',
                                },
                            }), error: !!errors.confirmPassword }),
                        errors.confirmPassword && (react_1.default.createElement("span", { className: classes.error }, errors.confirmPassword.message)))),
                react_1.default.createElement(core_1.Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit, disabled: loading, onClick: handleSubmit(onSubmit) }, "Sign Up")),
            react_1.default.createElement(core_1.Grid, null,
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/signin-company" }, "Already have an account? SignIn!")))));
}
exports.default = SignUp;
