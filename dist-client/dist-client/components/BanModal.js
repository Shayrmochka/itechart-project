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
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
var DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
function BanModal(_a) {
    var open = _a.open, handleClose = _a.handleClose, blockHandler = _a.blockHandler, selectedCard = _a.selectedCard;
    var _b = react_1.useState(''), reason = _b[0], setReason = _b[1];
    var handleChange = function (event) {
        setReason(event.target.value);
    };
    return (react_1.default.createElement("div", null, react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-title" }, react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Block account"), react_1.default.createElement(DialogContent_1.default, null, react_1.default.createElement(DialogContentText_1.default, null, "Be careful, all changes will be saved and recorded in the database, the account will no longer be able to be used. Please write the reason for blocking account."), react_1.default.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "name", label: "Block Reason", type: "reason", fullWidth: true, onChange: handleChange })), react_1.default.createElement(DialogActions_1.default, null, react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary" }, "Cancel"), react_1.default.createElement(Button_1.default, { onClick: function () {
            blockHandler(selectedCard, reason);
            handleClose();
        }, color: "primary" }, "Block")))));
}
exports.default = BanModal;
BanModal.propTypes = {
    open: prop_types_1.default.bool.isRequired,
    handleClose: prop_types_1.default.func.isRequired,
    blockHandler: prop_types_1.default.func.isRequired,
    selectedCard: prop_types_1.default.shape().isRequired,
};
