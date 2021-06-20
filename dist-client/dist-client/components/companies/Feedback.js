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
var prop_types_1 = __importDefault(require("prop-types"));
var core_1 = require("@material-ui/core");
var FeedbackOutlined_1 = __importDefault(require("@material-ui/icons/FeedbackOutlined"));
var Rating_1 = __importDefault(require("@material-ui/lab/Rating"));
var styles_1 = require("@material-ui/core/styles");
var react_redux_1 = require("react-redux");
var http_hook_1 = __importDefault(require("../../hooks/http.hook"));
var message_hook_1 = __importDefault(require("../../hooks/message.hook"));
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        paper: {
            marginTop: theme.spacing(2),
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
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        textArea: {
            maxWidth: '100%',
            minWidth: '100%',
            boxSizing: 'border-box',
            minHeight: '5em',
            marginTop: '10px',
            padding: '14px 14px',
            borderRadius: '4px',
            borderColor: '#c0c0c0',
            '&:hover': {
                borderColor: 'rgb(59, 59, 59)',
            },
            '&:focus': {
                borderColor: '#4058b5',
            },
            color: '#878787',
            fontSize: '1rem',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            letterSpacing: 'inherit',
        },
        clicked: {
            color: '#3f51b5',
        },
        notClicked: {
            color: '#989898',
        },
    });
});
function Feedback(_a) {
    var _this = this;
    var open = _a.open, handleClose = _a.handleClose, companyId = _a.companyId;
    var classes = useStyles();
    var request = http_hook_1.default().request;
    var message = message_hook_1.default();
    var currentUser = react_redux_1.useSelector(function (state) { return state.user.currentUser; });
    var _b = react_1.useState(0), rating = _b[0], setRating = _b[1];
    var _c = react_1.useState({
        feedbackText: '',
    }), feedback = _c[0], setFeedback = _c[1];
    var changeHandler = function (event) {
        var _a;
        setFeedback(__assign(__assign({}, feedback), (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var handleCreateFeedback = function (finalForm) {
        return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, request('/api/feedback/create-new-feedback', 'POST', __assign({}, finalForm))];
                    case 1:
                        _a.sent();
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
    var handleSubmit = function (event) {
        event.preventDefault();
        handleCreateFeedback(__assign(__assign({ rating: rating > 0 ? rating : 1 }, feedback), { logo: currentUser.logo, _id: currentUser._id, email: currentUser.email, firstName: currentUser.firstName, lastName: currentUser.lastName, companyId: companyId }));
        handleClose();
    };
    return (react_1.default.createElement("div", null, react_1.default.createElement(core_1.Dialog, { open: open, onClose: handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description", maxWidth: "sm" }, react_1.default.createElement(core_1.Container, { component: "main", maxWidth: "sm" }, react_1.default.createElement("div", { className: classes.paper }, react_1.default.createElement(core_1.Avatar, { className: classes.avatar }, react_1.default.createElement(FeedbackOutlined_1.default, null)), react_1.default.createElement(core_1.Typography, { component: "h1", variant: "h5" }, "Feedback"), react_1.default.createElement("form", { className: classes.form, noValidate: true }, react_1.default.createElement(core_1.Box, { display: "flex", justifyContent: "center", p: 2 }, react_1.default.createElement(Rating_1.default, { name: "simple-controlled", value: rating, onChange: function (event, newRating) {
            setRating(newRating);
        } })), react_1.default.createElement(core_1.TextareaAutosize, { className: classes.textArea, rowsMax: 4, "aria-label": "maximum height", placeholder: "Write your feedback here.", name: "feedbackText", value: feedback.feedbackText, onChange: changeHandler }), react_1.default.createElement(core_1.Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit, onClick: function (e) { return handleSubmit(e); } }, "Send")))))));
}
Feedback.propTypes = {
    open: prop_types_1.default.bool.isRequired,
    handleClose: prop_types_1.default.func.isRequired,
    companyId: prop_types_1.default.string.isRequired,
};
exports.default = Feedback;
