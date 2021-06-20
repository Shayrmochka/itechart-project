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
var react_redux_1 = require("react-redux");
var http_hook_1 = __importDefault(require("../../hooks/http.hook"));
var message_hook_1 = __importDefault(require("../../hooks/message.hook"));
var actions_1 = require("../../redux/actions");
var auth_hooh_1 = __importDefault(require("../../hooks/auth.hooh"));
var SocialButton_1 = __importDefault(require("../../components/SocialButton"));
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
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
            marginTop: theme.spacing(1),
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
        },
        links: {
            color: 'white',
            textDecoration: 'none',
        },
        signUpLink: { marginTop: '10px' },
    });
});
function AuthPage() {
    var _this = this;
    var dispatch = react_redux_1.useDispatch();
    var _a = react_hook_form_1.useForm(), register = _a.register, handleSubmit = _a.handleSubmit, errors = _a.errors;
    var classes = useStyles();
    var login = auth_hooh_1.default().login;
    var message = message_hook_1.default();
    var _b = http_hook_1.default(), loading = _b.loading, request = _b.request;
    var _c = react_1.useState({
        email: '',
        password: '',
    }), form = _c[0], setForm = _c[1];
    var onSubmit = function () {
        return __awaiter(_this, void 0, void 0, function () {
            var dataReq, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, request('/api/auth/login', 'POST', __assign({}, form))];
                    case 1:
                        dataReq = _a.sent();
                        login(dataReq.token);
                        dispatch(actions_1.getCurrentUser(__assign(__assign({}, dataReq.user), { token: dataReq.token })));
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
    var handleSocialLogin = function (user) {
        return __awaiter(_this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, request('/api/social-auth/google', 'POST', user.profile)];
                    case 1:
                        response = _a.sent();
                        login(response.token);
                        dispatch(actions_1.getCurrentUser(__assign(__assign({}, response.user), { token: response.token })));
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        message(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var handleSocialLoginFailure = function (err) {
        message(err);
    };
    var changeHandler = function (event) {
        var _a;
        setForm(__assign(__assign({}, form), (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    return (react_1.default.createElement(core_1.Container, { component: "main", maxWidth: "xs" }, react_1.default.createElement(CssBaseline_1.default, null), react_1.default.createElement("div", { className: classes.paper }, react_1.default.createElement(core_1.Avatar, { className: classes.avatar }, react_1.default.createElement(LockOutlined_1.default, null)), react_1.default.createElement(core_1.Typography, { component: "h1", variant: "h5" }, "Sign in"), react_1.default.createElement("form", { className: classes.form, noValidate: true }, react_1.default.createElement(react_router_dom_1.NavLink, { className: classes.links, to: "/signin-company" }, react_1.default.createElement("div", { className: classes.linksBlock }, "For Cleaning Companies")), react_1.default.createElement(core_1.TextField, { variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "email", label: "Email or Phone number", name: "email", autoComplete: "email", autoFocus: true, onChange: changeHandler, inputRef: register({
            required: 'You must provide the email address!',
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'You must provide a valid email address!',
            },
        }), error: !!errors.email }), errors.email && (react_1.default.createElement("span", { className: classes.error }, errors.email.message)), react_1.default.createElement(core_1.TextField, { variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password", onChange: changeHandler, inputRef: register({
            required: 'You must provide a password.',
            minLength: {
                value: 6,
                message: 'Your password must be greater than 6 characters',
            },
        }), error: !!errors.password }), errors.password && (react_1.default.createElement("span", { className: classes.error }, errors.password.message)), react_1.default.createElement(core_1.Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit, disabled: loading, onClick: handleSubmit(onSubmit) }, "Sign In")), react_1.default.createElement(core_1.Grid, { container: true }, react_1.default.createElement(SocialButton_1.default, { provider: "google", appId: "525057698721-clrqeoja3b3jtfr2qt5sh0jctdbmbu8v.apps.googleusercontent.com", onLoginSuccess: handleSocialLogin, onLoginFailure: handleSocialLoginFailure }, "Login with Google")), react_1.default.createElement(core_1.Grid, { className: classes.signUpLink, container: true }, react_1.default.createElement(react_router_dom_1.NavLink, { to: "/signup" }, "Don't have any account? Sign Up!")))));
}
exports.default = AuthPage;
