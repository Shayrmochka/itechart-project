"use strict";
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
var react_redux_1 = require("react-redux");
var http_hook_1 = __importDefault(require("../../hooks/http.hook"));
var actions_1 = require("../../redux/actions");
var message_hook_1 = __importDefault(require("../../hooks/message.hook"));
function AlertDialog(_a) {
    var _this = this;
    var open = _a.open, handleClose = _a.handleClose, logout = _a.logout;
    var currentUser = react_redux_1.useSelector(function (state) { return state.user.currentUser; });
    var request = http_hook_1.default().request;
    var message = message_hook_1.default();
    var dispatch = react_redux_1.useDispatch();
    var handleAgree = function () {
        return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(currentUser.type === 'user'))
                            return [3 /*break*/, 2];
                        dispatch(actions_1.showLoader());
                        return [4 /*yield*/, request('/api/user/delete-profile', 'DELETE', {
                                _id: currentUser._id,
                            })];
                    case 1:
                        _a.sent();
                        handleClose();
                        logout();
                        dispatch(actions_1.hideLoader());
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(currentUser.type === 'company'))
                            return [3 /*break*/, 4];
                        dispatch(actions_1.showLoader());
                        return [4 /*yield*/, request('/api/company/delete-profile', 'DELETE', {
                                _id: currentUser._id,
                            })];
                    case 3:
                        _a.sent();
                        handleClose();
                        logout();
                        dispatch(actions_1.hideLoader());
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        message(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return (react_1.default.createElement("div", null, react_1.default.createElement(core_1.Dialog, { open: open, onClose: handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" }, react_1.default.createElement(core_1.DialogTitle, { id: "alert-dialog-title" }, "Are you sure you want to delete your profile?"), react_1.default.createElement(core_1.DialogContent, null, react_1.default.createElement(core_1.DialogContentText, { id: "alert-dialog-description" }, "Deleting your account is permanent and will remove all content including comments, avatars and profile settings. Are you sure you want to delete your account?")), react_1.default.createElement(core_1.DialogActions, null, react_1.default.createElement(core_1.Button, { onClick: handleClose, color: "primary" }, "Disagree"), react_1.default.createElement(core_1.Button, { onClick: handleAgree, color: "primary", autoFocus: true }, "Agree")))));
}
exports.default = AlertDialog;
AlertDialog.propTypes = {
    open: prop_types_1.default.bool.isRequired,
    handleClose: prop_types_1.default.func.isRequired,
    logout: prop_types_1.default.func.isRequired,
};
