"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
}); });
function PriceBlock(_a) {
    var tiers = _a.tiers;
    var classes = useStyles();
    var history = react_router_dom_1.useHistory();
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var handleOpen = function () {
        if (user.isAuthenticated && user.currentUser.type === 'user') {
            history.push('/create-order');
        }
        else
            history.push('/signin');
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Container, { maxWidth: "md", component: "main", className: classes.heroContent },
            react_1.default.createElement(core_1.Typography, { component: "h1", variant: "h2", align: "center", color: "textPrimary", gutterBottom: true }, "Precise cleaning that makes places shine"),
            react_1.default.createElement(core_1.Typography, { variant: "h5", align: "center", color: "textSecondary", component: "p" }, "Clean, hygienic places demand high standards. As the world leaders in cleaning and hygiene, we are dedicated to the health, safety and well-being of your people, guests and customers.")),
        react_1.default.createElement(core_1.Container, { maxWidth: "md", component: "main" },
            react_1.default.createElement(core_1.Grid, { container: true, spacing: 5, alignItems: "flex-end" }, tiers.map(function (tier) { return (react_1.default.createElement(core_1.Grid, { item: true, key: tier.title, xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 },
                react_1.default.createElement(core_1.Card, null,
                    react_1.default.createElement(core_1.CardHeader, { title: tier.title, subheader: tier.subheader, titleTypographyProps: { align: 'center' }, subheaderTypographyProps: { align: 'center' }, className: classes.cardHeader }),
                    react_1.default.createElement(core_1.CardContent, null,
                        react_1.default.createElement("div", { className: classes.cardPricing },
                            react_1.default.createElement(core_1.Typography, { component: "h2", variant: "h3", color: "textPrimary" },
                                "$",
                                tier.price)),
                        react_1.default.createElement(core_1.Typography, { variant: "subtitle1", align: "center" }, tier.description)),
                    react_1.default.createElement(core_1.CardActions, null, user.isAuthenticated
                        && user.currentUser.type === 'company' ? (react_1.default.createElement(core_1.Button, { fullWidth: true, variant: tier.buttonVariant, color: "primary", disabled: true }, "Login as user")) : (react_1.default.createElement(core_1.Button, { fullWidth: true, variant: tier.buttonVariant, color: "primary", onClick: handleOpen }, tier.buttonText)))))); })))));
}
PriceBlock.propTypes = {
    tiers: prop_types_1.default.arrayOf(prop_types_1.default.shape({
        title: prop_types_1.default.string.isRequired,
        price: prop_types_1.default.string.isRequired,
        description: prop_types_1.default.string.isRequired,
        buttonText: prop_types_1.default.string.isRequired,
        buttonVariant: prop_types_1.default.string.isRequired,
    }).isRequired).isRequired,
};
exports.default = PriceBlock;
