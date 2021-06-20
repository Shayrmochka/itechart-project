"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        listItem: {
            padding: theme.spacing(1, 0),
        },
        total: {
            fontWeight: 700,
        },
        title: {
            marginTop: theme.spacing(2),
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
function Review(_a) {
    var finalForm = _a.finalForm, handlePlaceOrder = _a.handlePlaceOrder;
    var classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(core_1.Typography, { variant: "h6", gutterBottom: true }, "Order summary"), react_1.default.createElement(core_1.List, { disablePadding: true }, react_1.default.createElement(core_1.ListItem, { className: classes.listItem }, react_1.default.createElement(core_1.ListItemText, { primary: "Chosen Company" }), react_1.default.createElement(core_1.Typography, { variant: "subtitle1", className: classes.total }, finalForm.companyName)), react_1.default.createElement(core_1.ListItem, { className: classes.listItem }, react_1.default.createElement(core_1.ListItemText, { primary: "Chosen service" }), react_1.default.createElement(core_1.Typography, { variant: "subtitle1", className: classes.total }, finalForm.serviceName)), react_1.default.createElement(core_1.ListItem, { className: classes.listItem }, react_1.default.createElement(core_1.ListItemText, { primary: "Flat/House description" }), react_1.default.createElement(core_1.Typography, { variant: "subtitle1", className: classes.total }, finalForm.flatDescription)), react_1.default.createElement(core_1.ListItem, { className: classes.listItem }, react_1.default.createElement(core_1.ListItemText, { primary: "Bathrooms/Small rooms/Big rooms" }), react_1.default.createElement(core_1.Typography, { variant: "subtitle1", className: classes.total }, finalForm.bathRoomCounter, "/", finalForm.smallRoomCounter, "/", ' ', finalForm.bigRoomCounter)), react_1.default.createElement(core_1.ListItem, { className: classes.listItem }, react_1.default.createElement(core_1.ListItemText, { primary: "Price" }), react_1.default.createElement(core_1.Typography, { variant: "subtitle1", className: classes.total }, finalForm.resultPrice, "$")), react_1.default.createElement(core_1.ListItem, { className: classes.listItem }, react_1.default.createElement(core_1.ListItemText, { primary: "Time to work" }), react_1.default.createElement(core_1.Typography, { variant: "subtitle1", className: classes.total }, finalForm.resultTime, "min")), react_1.default.createElement(core_1.ListItem, { className: classes.listItem }, react_1.default.createElement(core_1.ListItemText, { primary: "Date" }), react_1.default.createElement(core_1.Typography, { variant: "subtitle1", className: classes.total }, finalForm.date))), react_1.default.createElement(core_1.Grid, { container: true }, react_1.default.createElement(core_1.Typography, { variant: "h6", gutterBottom: true, className: classes.title }, "Address"), react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.Typography, { gutterBottom: true }, finalForm.address))), react_1.default.createElement("div", { className: classes.buttons }, react_1.default.createElement(core_1.Button, { variant: "contained", color: "primary", onClick: handlePlaceOrder, className: classes.button }, "Place Order"))));
}
Review.propTypes = {
    finalForm: prop_types_1.default.shape().isRequired,
    handlePlaceOrder: prop_types_1.default.func.isRequired,
};
exports.default = Review;
