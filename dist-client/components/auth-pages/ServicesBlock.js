"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var Accordion_1 = __importDefault(require("@material-ui/core/Accordion"));
var AccordionSummary_1 = __importDefault(require("@material-ui/core/AccordionSummary"));
var AccordionDetails_1 = __importDefault(require("@material-ui/core/AccordionDetails"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var TypeOfServices_1 = __importDefault(require("./TypeOfServices"));
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}); });
function ServicesBlock(_a) {
    var handleChangeServices = _a.handleChangeServices, services = _a.services;
    var classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(Accordion_1.default, null,
            react_1.default.createElement(AccordionSummary_1.default, { expandIcon: react_1.default.createElement(ExpandMore_1.default, null), "aria-controls": "panel1a-content", id: "panel1a-header" },
                react_1.default.createElement(Typography_1.default, { className: classes.heading }, "Type of Services")),
            react_1.default.createElement(AccordionDetails_1.default, null,
                react_1.default.createElement(TypeOfServices_1.default, { handleChangeServices: handleChangeServices, services: services })))));
}
exports.default = ServicesBlock;
ServicesBlock.propTypes = {
    handleChangeServices: prop_types_1.default.func.isRequired,
    services: prop_types_1.default.shape({}).isRequired,
};
