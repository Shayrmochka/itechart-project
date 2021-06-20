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
var colors_1 = require("@material-ui/core/colors");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles(function () {
    return ({
        avatar: {
            backgroundColor: 'white',
            color: colors_1.blue[600],
        },
        listItem: {
            borderTop: '1px solid #00000020',
        },
        listItemAvatar: {
            width: '100%',
            objectFit: 'cover',
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        listItemText: { margin: '0' },
        itemTextEmpty: {
            margin: '0',
            color: 'rgb(169, 169, 169)',
        },
        dialogBody: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    });
});
function MailBox(_a) {
    var onClose = _a.onClose, open = _a.open, ordersSortedByAccepted = _a.ordersSortedByAccepted, handleClickOpenOrderDialog = _a.handleClickOpenOrderDialog, orders = _a.orders, currentUser = _a.currentUser;
    var classes = useStyles();
    var _b = react_1.useState(true), checkedOrders = _b[0], setCheckedOrders = _b[1];
    var handleChange = function (event) {
        setCheckedOrders(event.target.checked);
    };
    var returnOrders = function (propsOrders) {
        return (react_1.default.createElement(core_1.List, null, propsOrders.map(function (order) {
            return (react_1.default.createElement(core_1.ListItem, { button: true, onClick: function () { return handleClickOpenOrderDialog(order); }, key: order._id, className: classes.listItem }, react_1.default.createElement(core_1.ListItemAvatar, null, react_1.default.createElement(core_1.Avatar, { className: classes.avatar }, currentUser.type === 'user' ? (react_1.default.createElement("img", { className: classes.listItemAvatar, src: order.company.logo, alt: "company-logo" })) : (react_1.default.createElement("img", { className: classes.listItemAvatar, src: order.owner.logo, alt: "user-logo" })))), react_1.default.createElement("div", { className: classes.textContainer }, react_1.default.createElement("div", null, currentUser.type === 'user' ? (react_1.default.createElement(core_1.ListItemText, { className: classes.listItemText, primary: order.company.name })) : (react_1.default.createElement(core_1.ListItemText, { className: classes.listItemText, primary: order.owner.firstName + " " + order.owner.lastName })), react_1.default.createElement(core_1.ListItemText, { className: classes.itemTextEmpty, primary: order.serviceName })))));
        })));
    };
    return (react_1.default.createElement(core_1.Dialog, { fullWidth: true, maxWidth: "sm", onClose: onClose, "aria-labelledby": "simple-dialog-title", open: open }, react_1.default.createElement("div", { className: classes.dialogBody }, react_1.default.createElement(core_1.DialogTitle, { id: "simple-dialog-title" }, "Orders"), react_1.default.createElement(core_1.FormControlLabel, { control: (react_1.default.createElement(core_1.Checkbox, { checked: checkedOrders, onChange: handleChange, name: "checked", color: "primary" })), label: "Sort by accepted" })), !checkedOrders
        ? returnOrders(orders)
        : returnOrders(ordersSortedByAccepted)));
}
MailBox.propTypes = {
    onClose: prop_types_1.default.func.isRequired,
    open: prop_types_1.default.bool.isRequired,
    ordersSortedByAccepted: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
    handleClickOpenOrderDialog: prop_types_1.default.func.isRequired,
    orders: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
    currentUser: prop_types_1.default.shape().isRequired,
};
exports.default = MailBox;
