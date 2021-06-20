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
var prop_types_1 = __importDefault(require("prop-types"));
var react_router_dom_1 = require("react-router-dom");
var colors_1 = require("@material-ui/core/colors");
var styles_1 = require("@material-ui/core/styles");
var Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
var AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
var Mail_1 = __importDefault(require("@material-ui/icons/Mail"));
var Notifications_1 = __importDefault(require("@material-ui/icons/Notifications"));
var MoreVert_1 = __importDefault(require("@material-ui/icons/MoreVert"));
var core_1 = require("@material-ui/core");
var http_hook_1 = __importDefault(require("../hooks/http.hook"));
var MailBox_1 = __importDefault(require("./nav-bar/MailBox"));
var OrderInfo_1 = __importDefault(require("./nav-bar/OrderInfo"));
var useStyles = styles_1.makeStyles(function (theme) {
    var _a, _b, _c, _d, _e;
    return ({
        grow: {
            flexGrow: 1,
            marginBottom: '64px',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: (_a = {
                display: 'none'
            },
            _a[theme.breakpoints.up('sm')] = {
                display: 'block',
            },
            _a),
        linkTyp: {
            paddingLeft: '20px',
        },
        links: {
            color: 'white',
            textDecoration: 'none',
        },
        search: (_b = {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: styles_1.fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: styles_1.fade(theme.palette.common.white, 0.25),
                },
                marginRight: theme.spacing(2),
                marginLeft: 0,
                width: '100%'
            },
            _b[theme.breakpoints.up('sm')] = {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
            _b),
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: (_c = {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: "calc(1em + " + theme.spacing(4) + "px)",
                transition: theme.transitions.create('width'),
                width: '100%'
            },
            _c[theme.breakpoints.up('md')] = {
                width: '10ch',
            },
            _c),
        sectionDesktop: (_d = {
                display: 'none'
            },
            _d[theme.breakpoints.up('md')] = {
                display: 'flex',
            },
            _d),
        sectionMobile: (_e = {
                display: 'flex'
            },
            _e[theme.breakpoints.up('md')] = {
                display: 'none',
            },
            _e),
        avatar: {
            backgroundColor: 'white',
            color: colors_1.blue[600],
        },
        openMenuDialogStyle: {
            marginTop: '40px',
        },
        notifAnswer: {
            marginRight: '10px',
        },
        waiting: {
            color: 'orange',
        },
        accepted: {
            color: 'green',
        },
        declined: {
            color: 'red',
        },
        listItemImage: {
            width: '100%',
            objectFit: 'cover',
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        ownerName: { margin: '0' },
        serviceName: {
            margin: '0',
            color: '#a9a9a9',
        },
        noMoreNotifications: {
            margin: '0',
            color: '#a9a9a9',
        },
        appBar: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        toolBar: {
            maxWidth: '1280px',
            width: '100%',
        },
        navLinkImage: { height: '18px' },
    });
});
function sectionDesctop(handleOpenMail, ordersSortedByAccepted, notificationsId, handleNotificationsMenuOpen, sortedOrders, menuId, handleProfileMenuOpen) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.IconButton, { "aria-label": "show new mails", color: "inherit", onClick: handleOpenMail },
            react_1.default.createElement(core_1.Badge, { badgeContent: ordersSortedByAccepted.length, color: "secondary" },
                react_1.default.createElement(Mail_1.default, null))),
        react_1.default.createElement(core_1.IconButton, { "aria-label": "notifications", "aria-controls": notificationsId, "aria-haspopup": "true", onClick: handleNotificationsMenuOpen, color: "inherit" },
            react_1.default.createElement(core_1.Badge, { badgeContent: sortedOrders.length, color: "secondary" },
                react_1.default.createElement(Notifications_1.default, null))),
        react_1.default.createElement(core_1.IconButton, { edge: "end", "aria-label": "account of current user", "aria-controls": menuId, "aria-haspopup": "true", onClick: handleProfileMenuOpen, color: "inherit" },
            react_1.default.createElement(AccountCircle_1.default, null))));
}
function NavBar(props) {
    var orders = props.orders, sortedOrders = props.sortedOrders, ordersSortedByAccepted = props.ordersSortedByAccepted, currentUser = props.currentUser, isAuthenticated = props.isAuthenticated, logout = props.logout;
    var classes = useStyles();
    var history = react_router_dom_1.useHistory();
    var request = http_hook_1.default().request;
    var _a = react_1.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var _b = react_1.useState(null), notificationEl = _b[0], setNotificationEl = _b[1];
    var _c = react_1.useState(null), mobileMoreAnchorEl = _c[0], setMobileMoreAnchorEl = _c[1];
    var _d = react_1.useState({}), orderDialogInfo = _d[0], setOrderDialogInfo = _d[1];
    var _e = react_1.useState(false), openOrderDialog = _e[0], setOpenOrderDialog = _e[1];
    var _f = react_1.useState(false), openMail = _f[0], setOpenMail = _f[1];
    var handleClickOpenOrderDialog = function (order) {
        setOpenOrderDialog(true);
        setOrderDialogInfo(order);
    };
    var handleCloseOrderDialog = function () {
        setOpenOrderDialog(false);
        setOrderDialogInfo({});
    };
    var handleOpenMail = function () {
        setOpenMail(true);
    };
    var handleCloseMail = function () {
        setOpenMail(false);
    };
    var isNotificationsOpen = Boolean(notificationEl);
    var isMenuOpen = Boolean(anchorEl);
    var isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    var createOrder = function () {
        if (currentUser.type === 'user') {
            return (react_1.default.createElement(core_1.Typography, { className: classes.title + " " + classes.linkTyp, noWrap: true },
                react_1.default.createElement(react_router_dom_1.NavLink, { className: classes.links, to: "/create-order" }, "Create Order")));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null));
    };
    var adminButton = function () {
        if (currentUser.role === 'Admin') {
            return (react_1.default.createElement(core_1.Typography, { className: classes.title + " " + classes.linkTyp, noWrap: true },
                react_1.default.createElement(react_router_dom_1.NavLink, { className: classes.links, to: "/users" }, "Admin panel")));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null));
    };
    var companyCalendar = function () {
        if (currentUser.type === 'company') {
            return (react_1.default.createElement(core_1.Typography, { className: classes.title + " " + classes.linkTyp, noWrap: true },
                react_1.default.createElement(react_router_dom_1.NavLink, { className: classes.links, to: "/calendar" }, "Company Calendar")));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null));
    };
    var handleNotificationsMenuOpen = function (event) {
        setNotificationEl(event.currentTarget);
    };
    var handleNotificationsMenuClose = function () {
        setNotificationEl(null);
    };
    var handleProfileMenuOpen = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleMobileMenuClose = function () {
        setMobileMoreAnchorEl(null);
    };
    var handleMenuClose = function () {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    var handleMobileMenuOpen = function (event) {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    var openProfile = function () {
        history.push('/profile');
        handleMenuClose();
    };
    var logoutHandler = function () {
        handleMenuClose();
        logout();
        history.push('/home');
    };
    var menuId = 'primary-search-account-menu';
    var renderMenu = (react_1.default.createElement(core_1.Menu, { anchorEl: anchorEl, anchorOrigin: { vertical: 'top', horizontal: 'right' }, id: menuId, keepMounted: true, transformOrigin: { vertical: 'top', horizontal: 'right' }, open: isMenuOpen, onClose: handleMenuClose },
        react_1.default.createElement(core_1.MenuItem, { onClick: openProfile }, "Profile"),
        react_1.default.createElement(core_1.MenuItem, { onClick: logoutHandler }, "Logout")));
    var notificationsId = 'primary-search-notifications-menu';
    var renderNotifications = (react_1.default.createElement(core_1.Menu, { className: classes.openMenuDialogStyle, anchorEl: notificationEl, anchorOrigin: { vertical: 'top', horizontal: 'right' }, id: notificationsId, keepMounted: true, transformOrigin: { vertical: 'top', horizontal: 'right' }, open: isNotificationsOpen, onClose: handleNotificationsMenuClose },
        react_1.default.createElement(core_1.List, null, sortedOrders.length ? (sortedOrders.map(function (order) { return (react_1.default.createElement(core_1.ListItem, { button: true, onClick: function () { return handleClickOpenOrderDialog(order); }, key: order._id },
            react_1.default.createElement(core_1.ListItemAvatar, null,
                react_1.default.createElement(core_1.Avatar, { className: classes.avatar }, currentUser.type === 'user' ? (react_1.default.createElement("img", { className: classes.listItemImage, src: order.company.logo, alt: "company-logo" })) : (react_1.default.createElement("img", { className: classes.listItemImage, src: order.owner.logo, alt: "company-logo" })))),
            currentUser.type === 'user' ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(core_1.ListItemText, { className: classes.notifAnswer, primary: order.company.name }),
                react_1.default.createElement(core_1.ListItemText, { primary: order.status }))) : (react_1.default.createElement("div", { className: classes.textContainer },
                react_1.default.createElement(core_1.ListItemText, { className: classes.ownerName, primary: order.owner.firstName + " " + order.owner.lastName }),
                react_1.default.createElement(core_1.ListItemText, { className: classes.serviceName, primary: order.serviceName }))))); })) : (react_1.default.createElement(core_1.ListItem, null,
            react_1.default.createElement(core_1.ListItemText, { className: classes.noMoreNotifications, primary: "There are no notifications!)" }))))));
    var mobileMenuId = 'primary-search-account-menu-mobile';
    var renderMobileMenu = (react_1.default.createElement(core_1.Menu, { anchorEl: mobileMoreAnchorEl, anchorOrigin: { vertical: 'top', horizontal: 'right' }, id: mobileMenuId, keepMounted: true, transformOrigin: { vertical: 'top', horizontal: 'right' }, open: isMobileMenuOpen, onClose: handleMobileMenuClose },
        react_1.default.createElement(core_1.MenuItem, { onClick: handleOpenMail },
            react_1.default.createElement(core_1.IconButton, { "aria-label": "show 4 new mails", color: "inherit" },
                react_1.default.createElement(core_1.Badge, { badgeContent: ordersSortedByAccepted.length, color: "secondary" },
                    react_1.default.createElement(Mail_1.default, null))),
            react_1.default.createElement("p", null, "Messages")),
        react_1.default.createElement(core_1.MenuItem, { onClick: handleNotificationsMenuOpen },
            react_1.default.createElement(core_1.IconButton, { "aria-label": "show 11 new notifications", color: "inherit", "aria-controls": "primary-search-notifications-menu" },
                react_1.default.createElement(core_1.Badge, { badgeContent: sortedOrders.length, color: "secondary" },
                    react_1.default.createElement(Notifications_1.default, null))),
            react_1.default.createElement("p", null, "Notifications Mobile")),
        react_1.default.createElement(core_1.MenuItem, { onClick: handleProfileMenuOpen },
            react_1.default.createElement(core_1.IconButton, { "aria-label": "account of current user", "aria-controls": "primary-search-account-menu", "aria-haspopup": "true", color: "inherit" },
                react_1.default.createElement(AccountCircle_1.default, null)),
            react_1.default.createElement("p", null, "Profile"))));
    return (react_1.default.createElement("div", { className: classes.grow },
        react_1.default.createElement(core_1.AppBar, { className: classes.appBar },
            react_1.default.createElement(core_1.Toolbar, { className: classes.toolBar },
                react_1.default.createElement(core_1.IconButton, { edge: "start", className: classes.menuButton, color: "inherit", "aria-label": "open drawer" },
                    react_1.default.createElement(Menu_1.default, null)),
                react_1.default.createElement(react_router_dom_1.NavLink, { className: classes.links, to: "/home" },
                    react_1.default.createElement("img", { className: classes.navLinkImage, src: "https://itechart-by.s3.amazonaws.com/storage/static/svg/itechart.svg", alt: "company-logo" })),
                Object.keys(currentUser).length ? createOrder() : react_1.default.createElement(react_1.default.Fragment, null),
                react_1.default.createElement(core_1.Typography, { className: classes.title + " " + classes.linkTyp, noWrap: true },
                    react_1.default.createElement(react_router_dom_1.NavLink, { className: classes.links, to: "/companies" }, "Companies")),
                Object.keys(currentUser).length ? adminButton() : react_1.default.createElement(react_1.default.Fragment, null),
                Object.keys(currentUser).length ? companyCalendar() : react_1.default.createElement(react_1.default.Fragment, null),
                react_1.default.createElement("div", { className: classes.grow }),
                react_1.default.createElement("div", { className: classes.sectionDesktop }, isAuthenticated ? (sectionDesctop(handleOpenMail, ordersSortedByAccepted, notificationsId, handleNotificationsMenuOpen, sortedOrders, menuId, handleProfileMenuOpen)) : (react_1.default.createElement(core_1.Button, { onClick: function () { return history.push('/signin'); }, color: "inherit" }, "Login"))),
                react_1.default.createElement("div", { className: classes.sectionMobile },
                    react_1.default.createElement(core_1.IconButton, { "aria-label": "show more", "aria-controls": mobileMenuId, "aria-haspopup": "true", onClick: handleMobileMenuOpen, color: "inherit" },
                        react_1.default.createElement(MoreVert_1.default, null))))),
        renderMobileMenu,
        renderMenu,
        renderNotifications,
        react_1.default.createElement(OrderInfo_1.default, { open: openOrderDialog, onClose: handleCloseOrderDialog, orderDialogInfo: orderDialogInfo, request: request, currentUser: currentUser }),
        react_1.default.createElement(MailBox_1.default, { open: openMail, onClose: handleCloseMail, orders: orders, ordersSortedByAccepted: ordersSortedByAccepted, handleClickOpenOrderDialog: handleClickOpenOrderDialog, currentUser: currentUser })));
}
NavBar.propTypes = {
    currentUser: prop_types_1.default.shape().isRequired,
    isAuthenticated: prop_types_1.default.bool.isRequired,
    logout: prop_types_1.default.func.isRequired,
    orders: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
    sortedOrders: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
    ordersSortedByAccepted: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
};
exports.default = NavBar;
