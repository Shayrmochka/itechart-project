"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var useStyles = styles_1.makeStyles(function () {
    return ({
        root: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    });
});
function Loader() {
    var classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.root }, react_1.default.createElement(core_1.CircularProgress, null)));
}
exports.default = Loader;
