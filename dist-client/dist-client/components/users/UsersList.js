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
var styles_1 = require("@material-ui/core/styles");
var react_redux_1 = require("react-redux");
var http_hook_1 = __importDefault(require("../../hooks/http.hook"));
var BanModal_1 = __importDefault(require("../BanModal"));
var useStyles = styles_1.makeStyles({
    root: {
        display: 'flex',
    },
    card: {
        minWidth: 200,
        maxWidth: 220,
        minHeight: 240,
        margin: 10,
        cursor: 'pointer',
        transition: '0.5s',
        boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.2)',
        '&:hover': {
            transform: 'translateY(-5px)',
        },
    },
    cardBanned: {
        minWidth: 200,
        maxWidth: 220,
        minHeight: 240,
        margin: 10,
        cursor: 'pointer',
        transition: '0.5s',
        boxShadow: '0 3px 6px 0 rgb(255 0 0 / 84%)',
        '&:hover': {
            transform: 'translateY(-5px)',
        },
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 4,
    },
    link: {
        textDecoration: 'none',
        textTransform: 'none',
    },
    cardContent: { textAlign: 'center', paddingBottom: '0px' },
    cardBody: { textAlign: 'center' },
    cardImage: {
        width: '100px',
        height: 'auto',
        borderRadius: '100px',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'center',
    },
});
function UsersList(_a) {
    var _this = this;
    var users = _a.users, open = _a.open, handleClickOpen = _a.handleClickOpen, handleClose = _a.handleClose;
    var currentUser = react_redux_1.useSelector(function (state) { return state.user.currentUser; });
    var classes = useStyles();
    var _b = react_1.useState([]), allUsers = _b[0], setAllUsers = _b[1];
    var _c = react_1.useState({}), selectedUser = _c[0], setSelectedUser = _c[1];
    react_1.useEffect(function () {
        setAllUsers(users);
    }, [users]);
    var request = http_hook_1.default().request;
    var blockHandler = function (user, reason) {
        return __awaiter(_this, void 0, void 0, function () {
            var response_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(currentUser._id !== user._id))
                            return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request('/api/user/update', 'PUT', __assign(__assign({}, user), { banReason: reason }))];
                    case 2:
                        response_1 = _a.sent();
                        setAllUsers(allUsers.map(function (e) { return (e._id !== response_1._id ? e : response_1); }));
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw new Error(e_1);
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        alert('You can not block your account');
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    if (!allUsers.length) {
        return react_1.default.createElement("div", null, "No Users!");
    }
    return (react_1.default.createElement("div", { className: classes.root }, allUsers.map(function (user) {
        return (react_1.default.createElement(core_1.Card, { className: user.isActive ? classes.card : classes.cardBanned, key: user._id }, react_1.default.createElement(core_1.CardContent, { className: classes.cardContent }, react_1.default.createElement("div", { className: classes.cardBody }, react_1.default.createElement("img", { className: classes.cardImage, src: user.logo, alt: "user-logo" })), react_1.default.createElement(core_1.Typography, { variant: "h6", component: "h2" }, user.firstName, ' ', user.lastName), react_1.default.createElement(core_1.Typography, { className: classes.title, color: "textSecondary", gutterBottom: true }, user.role === 'Admin' ? 'Admin' : 'User'), react_1.default.createElement(core_1.Typography, { className: classes.pos, color: "textSecondary" }, user.email), react_1.default.createElement(core_1.Typography, { className: classes.pos, color: "textSecondary" }, user.isActive ? user.phone : "Blocked: " + user.banReason)), react_1.default.createElement(core_1.CardActions, { className: classes.cardActions }, user.isActive ? (react_1.default.createElement(core_1.Button, { size: "small", onClick: function () {
                setSelectedUser(user);
                handleClickOpen();
            } }, "Block")) : (react_1.default.createElement(core_1.Button, { size: "small", onClick: function () { return blockHandler(user); } }, "Unblock")))));
    }), react_1.default.createElement(BanModal_1.default, { open: open, handleClose: handleClose, blockHandler: blockHandler, selectedCard: selectedUser })));
}
UsersList.propTypes = {
    users: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
    open: prop_types_1.default.bool.isRequired,
    handleClickOpen: prop_types_1.default.func.isRequired,
    handleClose: prop_types_1.default.func.isRequired,
};
exports.default = UsersList;
