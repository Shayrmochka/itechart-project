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
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var Footer_1 = __importDefault(require("../../components/Footer"));
var EditProfile_1 = __importDefault(require("../../components/profile/EditProfile"));
var DeleteProfile_1 = __importDefault(require("../../components/profile/DeleteProfile"));
var EditCompanyProfile_1 = __importDefault(require("../../components/profile/EditCompanyProfile"));
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        heroContent: {
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
        },
        logoImgBlock: {
            textAlign: 'center',
            borderRadius: '100px',
            marginBottom: '20px',
        },
        logoImg: {
            width: '180px',
            borderRadius: '200px',
        },
    });
});
function UserProfile(_a) {
    var logout = _a.logout;
    var currentUser = react_redux_1.useSelector(function (state) { return state.user.currentUser; });
    var _b = react_1.useState(false), editProfileOpen = _b[0], setEditProfileOpen = _b[1];
    var handleEditProfile = function () {
        setEditProfileOpen(true);
    };
    var handleEditProfileClose = function () {
        setEditProfileOpen(false);
    };
    var _c = react_1.useState(false), editCompany = _c[0], setEditCompany = _c[1];
    var handleEditCompany = function () {
        setEditCompany(true);
    };
    var handleEditCompanyClose = function () {
        setEditCompany(false);
    };
    var _d = react_1.useState(false), deleteOpen = _d[0], setDeleteOpen = _d[1];
    var handleDeleteOpen = function () {
        setDeleteOpen(true);
    };
    var handleDeleteClose = function () {
        setDeleteOpen(false);
    };
    var classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(CssBaseline_1.default, null), react_1.default.createElement("div", { className: classes.heroContent }, react_1.default.createElement(core_1.Container, { maxWidth: "sm" }, react_1.default.createElement("div", { className: classes.logoImgBlock }, react_1.default.createElement("img", { className: classes.logoImg, src: currentUser.logo, alt: "profile-logo" })), react_1.default.createElement(core_1.Typography, { component: "h1", variant: "h4", align: "center", color: "textPrimary" }, currentUser.firstName, ' ', currentUser.lastName), react_1.default.createElement(core_1.Typography, { variant: "h6", align: "center", color: "textSecondary", gutterBottom: true }, currentUser.role), react_1.default.createElement(core_1.Typography, { align: "center", color: "textSecondary", paragraph: true }, "Email:", ' ', currentUser.email), react_1.default.createElement(core_1.Typography, { align: "center", color: "textSecondary", paragraph: true }, "Phone:", currentUser.type === 'user' ? currentUser.phone : ' * * * * * * *'), react_1.default.createElement(core_1.Typography, { align: "center", color: "textSecondary", paragraph: true }, "id: @", currentUser._id), react_1.default.createElement("div", { className: classes.heroButtons }, react_1.default.createElement(core_1.Grid, { container: true, spacing: 2, justify: "center" }, react_1.default.createElement(core_1.Grid, { item: true }, currentUser.type === 'user' ? (react_1.default.createElement(core_1.Button, { onClick: handleEditProfile, variant: "contained", color: "primary" }, "Edit Profile")) : (react_1.default.createElement(core_1.Button, { onClick: handleEditCompany, variant: "contained", color: "primary" }, "Edit Profile"))), react_1.default.createElement(core_1.Grid, { item: true }, react_1.default.createElement(core_1.Button, { onClick: handleDeleteOpen, variant: "outlined", color: "primary" }, "Delete Profile")))))), react_1.default.createElement(Footer_1.default, null), react_1.default.createElement(EditProfile_1.default, { open: editProfileOpen, handleClose: handleEditProfileClose }), react_1.default.createElement(EditCompanyProfile_1.default, { open: editCompany, handleClose: handleEditCompanyClose }), react_1.default.createElement(DeleteProfile_1.default, { open: deleteOpen, handleClose: handleDeleteClose, logout: logout })));
}
UserProfile.propTypes = {
    logout: prop_types_1.default.func.isRequired,
};
exports.default = UserProfile;
