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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Snackbar_1 = __importDefault(require("@material-ui/core/Snackbar"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Close_1 = __importDefault(require("@material-ui/icons/Close"));
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        close: {
            padding: theme.spacing(0.5),
        },
    });
});
function Alerts() {
    var _a = react_1.useState([]), snackPack = _a[0], setSnackPack = _a[1];
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var _c = react_1.useState(undefined), messageInfo = _c[0], setMessageInfo = _c[1];
    react_1.useEffect(function () {
        if (snackPack.length && !messageInfo) {
            setMessageInfo(__assign({}, snackPack[0]));
            setSnackPack(function (prev) { return prev.slice(1); });
            setOpen(true);
        }
        else if (snackPack.length && messageInfo && open) {
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);
    var handleClick = function (message) {
        return function () {
            setSnackPack(function (prev) { return __spreadArray(__spreadArray([], prev), [{ message: message, key: new Date().getTime() }]); });
        };
    };
    var handleClose = function (event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    var handleExited = function () {
        setMessageInfo(undefined);
    };
    var classes = useStyles();
    return (react_1.default.createElement("div", null, react_1.default.createElement(Button_1.default, { onClick: handleClick('Message A') }, "Show message A"), react_1.default.createElement(Button_1.default, { onClick: handleClick('Message B') }, "Show message B"), react_1.default.createElement(Snackbar_1.default, { key: messageInfo ? messageInfo.key : undefined, anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        }, open: open, autoHideDuration: 2000, onClose: handleClose, onExited: handleExited, message: messageInfo ? messageInfo.message : undefined, action: (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(Button_1.default, { color: "secondary", size: "small", onClick: handleClose }, "UNDO"), react_1.default.createElement(IconButton_1.default, { "aria-label": "close", color: "inherit", className: classes.close, onClick: handleClose }, react_1.default.createElement(Close_1.default, null)))) })));
}
exports.default = Alerts;
