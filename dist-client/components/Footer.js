"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var CookiePreferences_1 = __importDefault(require("./cookie-preferences/CookiePreferences"));
function Copyright() {
    return (react_1.default.createElement(core_1.Typography, { variant: "body2", color: "textSecondary", align: "center" },
        'Copyright © ',
        react_1.default.createElement(core_1.Link, { color: "inherit", href: "https://github.com/Shayrmochka" }, "iTechArt"),
        ' ',
        new Date().getFullYear(),
        "."));
}
var useStyles = styles_1.makeStyles(function (theme) {
    var _a;
    return ({
        '@global': {
            ul: {
                margin: 0,
                padding: 0,
                listStyle: 'none',
            },
        },
        link: {
            margin: theme.spacing(1, 1.5),
        },
        footer: (_a = {
                borderTop: "1px solid " + theme.palette.divider,
                marginTop: theme.spacing(8),
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3)
            },
            _a[theme.breakpoints.up('sm')] = {
                paddingTop: theme.spacing(6),
                paddingBottom: theme.spacing(6),
            },
            _a),
        footerButton: {
            color: 'rgba(0, 0, 0, 0.54)',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            padding: '0',
            fontSize: '1rem',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: '400',
            lineHeight: '1.75',
            letterSpacing: '0.00938em',
            cursor: 'pointer',
        },
        navLink: {
            textDecoration: 'none',
            color: 'rgba(0, 0, 0, 0.54)',
        },
        buttonContainer: {
            width: '100%',
            textAlign: 'left',
            paddingLeft: '16px',
        },
    });
});
var footers = [
    {
        title: 'Company',
        description: ['History', 'Contact us', 'Locations'],
        link: ['History', '/contactus', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Another one'],
        link: ['Cool stuff', 'Random feature', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Another resource', 'Final resource'],
        link: ['Resource', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
        link: ['Privacy policy', 'Terms of use'],
    },
];
function Footer() {
    var classes = useStyles();
    var _a = react_1.useState({
        closed: true,
    }), modalStatus = _a[0], setModalStatus = _a[1];
    react_1.useEffect(function () {
        setModalStatus({ closed: true });
        // effect;
        // return () => {
        //   cleanup;
        // };
    }, []);
    var openCookiePreferences = function () {
        setModalStatus({ closed: false });
    };
    var closeCookiePreferences = function () {
        setModalStatus({ closed: true });
    };
    var returnCookiePreferences = function () {
        if (!modalStatus.closed) {
            return (react_1.default.createElement(CookiePreferences_1.default, { modalStatus: modalStatus, closeCookiePreferences: closeCookiePreferences }));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(CssBaseline_1.default, null),
        react_1.default.createElement(core_1.Container, { maxWidth: "lg", component: "footer", className: classes.footer },
            react_1.default.createElement(core_1.Grid, { container: true, spacing: 4, justify: "space-evenly" },
                footers.map(function (footer) { return (react_1.default.createElement(core_1.Grid, { item: true, xs: 6, sm: 3, key: footer.title },
                    react_1.default.createElement(core_1.Typography, { variant: "h6", color: "textPrimary", gutterBottom: true }, footer.title),
                    react_1.default.createElement("ul", null, footer.description.map(function (item, i) { return (react_1.default.createElement("li", { key: item },
                        react_1.default.createElement(react_router_dom_1.NavLink, { className: classes.navLink, to: footer.link[i], variant: "subtitle1", color: "textSecondary" }, item))); })))); }),
                react_1.default.createElement("div", { className: classes.buttonContainer },
                    react_1.default.createElement("button", { type: "button", className: classes.footerButton, onClick: function () { return openCookiePreferences(); } }, "Cookie Preferences"),
                    !modalStatus.closed ? returnCookiePreferences() : react_1.default.createElement("div", null))),
            react_1.default.createElement(core_1.Box, { mt: 5 },
                react_1.default.createElement(Copyright, null)))));
}
exports.default = Footer;
