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
var styles_1 = require("@material-ui/core/styles");
var AddressForm_1 = __importDefault(require("./AddressForm"));
var Review_1 = __importDefault(require("./Review"));
var http_hook_1 = __importDefault(require("../../../hooks/http.hook"));
var getPrice_1 = __importDefault(require("../../../utils/getPrice"));
var message_hook_1 = __importDefault(require("../../../hooks/message.hook"));
var useStyles = styles_1.makeStyles(function (theme) {
    var _a, _b;
    return ({
        layout: (_a = {
                width: 'auto',
                marginLeft: theme.spacing(2),
                marginRight: theme.spacing(2)
            },
            _a[theme.breakpoints.up(600 + theme.spacing(2) * 2)] = {
                width: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            _a),
        paper: (_b = {
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(3),
                padding: theme.spacing(2)
            },
            _b[theme.breakpoints.up(600 + theme.spacing(3) * 2)] = {
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(3),
            },
            _b),
        stepper: {
            padding: theme.spacing(3, 10, 5),
        },
        buttons: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        },
    });
});
var steps = ['Address', 'Review your order'];
function Checkout() {
    var _this = this;
    var classes = useStyles();
    var request = http_hook_1.default().request;
    var message = message_hook_1.default();
    var _a = react_1.useState(0), activeStep = _a[0], setActiveStep = _a[1];
    var _b = react_1.useState({}), finalForm = _b[0], setFinalForm = _b[1];
    var handleNext = function () {
        setActiveStep(activeStep + 1);
    };
    var handleBack = function () {
        setActiveStep(activeStep - 1);
    };
    var updateFinalForm = function (value) {
        var moneyDetail = getPrice_1.default(value);
        setFinalForm(__assign(__assign({}, value), moneyDetail));
        handleNext();
    };
    var handlePlaceOrder = function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request('/api/order/create-new-order', 'POST', finalForm)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    message(e_1);
                    return [3 /*break*/, 3];
                case 3:
                    handleNext();
                    return [2 /*return*/];
            }
        });
    }); };
    function getStepContent(step) {
        switch (step) {
            case 0:
                return react_1.default.createElement(AddressForm_1.default, { updateFinalForm: updateFinalForm });
            case 1:
                return (react_1.default.createElement(Review_1.default, { finalForm: finalForm, handlePlaceOrder: handlePlaceOrder }));
            default:
                throw new Error('Unknown step');
        }
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement("main", { className: classes.layout },
            react_1.default.createElement(core_1.Paper, { className: classes.paper },
                react_1.default.createElement(core_1.Typography, { component: "h1", variant: "h4", align: "center" }, "Checkout"),
                react_1.default.createElement(core_1.Stepper, { activeStep: activeStep, className: classes.stepper }, steps.map(function (label) { return (react_1.default.createElement(core_1.Step, { key: label },
                    react_1.default.createElement(core_1.StepLabel, null, label))); })),
                react_1.default.createElement(react_1.default.Fragment, null, activeStep === steps.length ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(core_1.Typography, { variant: "h5", gutterBottom: true }, "Thank you for your order."),
                    react_1.default.createElement(core_1.Typography, { variant: "subtitle1" }, "Your order number is #2001539. We have emailed your order confirmation."))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    getStepContent(activeStep),
                    react_1.default.createElement("div", { className: classes.buttons }, activeStep !== 0 && (react_1.default.createElement(core_1.Button, { onClick: handleBack, className: classes.button }, "Back"))))))))));
}
exports.default = Checkout;
