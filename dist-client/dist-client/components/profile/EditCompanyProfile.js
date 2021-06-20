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
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var react_hook_form_1 = require("react-hook-form");
var react_redux_1 = require("react-redux");
var http_hook_1 = __importDefault(require("../../hooks/http.hook"));
var actions_1 = require("../../redux/actions");
var message_hook_1 = __importDefault(require("../../hooks/message.hook"));
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
        dialogTitle: { textAlign: 'center' },
    });
});
function EditCompanyProfile(_a) {
    var _this = this;
    var open = _a.open, handleClose = _a.handleClose;
    var classes = useStyles();
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.errors;
    var _c = react_hook_form_1.useForm(), registerPassword = _c.register, handleSubmitPassword = _c.handleSubmit, errorsPassword = _c.errors;
    var request = http_hook_1.default().request;
    var message = message_hook_1.default();
    var dispatch = react_redux_1.useDispatch();
    var currentUser = react_redux_1.useSelector(function (state) { return state.user.currentUser; });
    var onSubmit = function (data) {
        return __awaiter(_this, void 0, void 0, function () {
            var dataReq, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, request('/api/company/edit-profile', 'PUT', __assign(__assign({}, data), { _id: currentUser._id, operationType: 'profile' }))];
                    case 1:
                        dataReq = _a.sent();
                        dispatch(actions_1.getCurrentUser(__assign({}, dataReq)));
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
    var onSubmitPassword = function (data) {
        return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, request('/api/company/edit-profile', 'POST', __assign(__assign({}, data), { _id: currentUser._id, operationType: 'password' }))];
                    case 1:
                        _a.sent();
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
    return (react_1.default.createElement("div", null, react_1.default.createElement(core_1.Dialog, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-title" }, react_1.default.createElement(core_1.DialogTitle, { id: "form-dialog-title", className: classes.dialogTitle }, "Update Profile"), react_1.default.createElement(core_1.DialogContent, null, react_1.default.createElement(core_1.DialogContentText, null, "Welcome to the page for editing user information, be careful."), react_1.default.createElement("form", { noValidate: true, onSubmit: handleSubmit(onSubmit) }, react_1.default.createElement(core_1.Grid, { container: true, spacing: 2 }, react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 }, react_1.default.createElement(core_1.TextField, { autoComplete: "name", name: "name", variant: "outlined", required: true, fullWidth: true, id: "name", label: "Company Name", defaultValue: currentUser.name, inputRef: register({ required: true }), error: !!errors.name }), errors.name && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 }, react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, id: "priceList", label: "Company's percentage", name: "priceList", autoComplete: "priceList", defaultValue: currentUser.priceList, inputRef: register({ required: true }), error: !!errors.priceList }), errors.priceList && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 }, react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", defaultValue: currentUser.email, inputRef: register({
            required: 'You must provide the email address!',
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'You must provide a valid email address!',
            },
        }), error: !!errors.email }), errors.email && (react_1.default.createElement("span", { className: classes.error }, errors.email.message))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 }, react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, id: "address", label: "Address", name: "address", autoComplete: "address", defaultValue: currentUser.address, inputRef: register({ required: true }), error: !!errors.address }), errors.address && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, id: "description", label: "Company Description", name: "description", autoComplete: "description", defaultValue: currentUser.description, inputRef: register({ required: true }), error: !!errors.description }), errors.description && (react_1.default.createElement("span", { className: classes.error }, "This field is required")))), react_1.default.createElement(core_1.DialogActions, null, react_1.default.createElement(core_1.Button, { onClick: handleClose, color: "primary" }, "Cancel"), react_1.default.createElement(core_1.Button, { type: "submit", color: "primary" }, "Update"))), react_1.default.createElement("form", { noValidate: true, onSubmit: handleSubmitPassword(onSubmitPassword) }, react_1.default.createElement(core_1.Grid, { container: true, spacing: 2 }, react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, name: "oldPassword", label: "Old Password", type: "password", id: "oldPassword", autoComplete: "current-password", inputRef: registerPassword({
            required: 'You must provide a password.',
            minLength: {
                value: 6,
                message: 'Your password must be greater than 6 characters',
            },
        }), error: !!errorsPassword.oldPassword }), errorsPassword.oldPassword && (react_1.default.createElement("span", { className: classes.error }, errorsPassword.oldPassword.message))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, name: "password", label: "New Password", type: "password", id: "password", autoComplete: "current-password", inputRef: registerPassword({
            required: 'You must provide a password.',
            minLength: {
                value: 6,
                message: 'Your password must be greater than 6 characters',
            },
        }), error: !!errorsPassword.password }), errorsPassword.password && (react_1.default.createElement("span", { className: classes.error }, errorsPassword.password.message))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.TextField, { variant: "outlined", required: true, fullWidth: true, name: "confirmPassword", label: "Confirm New Password", type: "password", id: "confirm-password", autoComplete: "current-password", inputRef: registerPassword({
            required: 'You must provide a password.',
            minLength: {
                value: 6,
                message: 'Your password must be greater than 6 characters',
            },
        }), error: !!errorsPassword.confirmPassword }), errorsPassword.confirmPassword && (react_1.default.createElement("span", { className: classes.error }, errorsPassword.confirmPassword.message)))), react_1.default.createElement(core_1.DialogActions, null, react_1.default.createElement(core_1.Button, { onClick: handleClose, color: "primary" }, "Cancel"), react_1.default.createElement(core_1.Button, { type: "submit", color: "primary" }, "Update")))))));
}
exports.default = EditCompanyProfile;
EditCompanyProfile.propTypes = {
    open: prop_types_1.default.bool.isRequired,
    handleClose: prop_types_1.default.func.isRequired,
};
