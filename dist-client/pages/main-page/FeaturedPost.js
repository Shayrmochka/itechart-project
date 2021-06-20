"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles({
    card: {
        display: 'flex',
        height: '240px',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    mainCard: {
        maxHeight: '200px',
    },
});
function FeaturedPost(props) {
    var classes = useStyles();
    var post = props.post;
    return (react_1.default.createElement(core_1.Grid, { item: true, xs: 12, md: 6 },
        react_1.default.createElement(core_1.CardActionArea, { component: "a" },
            react_1.default.createElement(core_1.Card, { className: classes.card },
                react_1.default.createElement("div", { className: classes.cardDetails },
                    react_1.default.createElement(core_1.CardContent, null,
                        react_1.default.createElement(core_1.Typography, { component: "h2", variant: "h5" }, post.title),
                        react_1.default.createElement(core_1.Typography, { variant: "subtitle1", color: "textSecondary" }, post.company),
                        react_1.default.createElement(core_1.Typography, { variant: "subtitle1", paragraph: true }, post.description),
                        react_1.default.createElement(core_1.Typography, { variant: "subtitle1", color: "primary" }, "Continue reading..."))),
                react_1.default.createElement(core_1.Hidden, { smDown: true },
                    react_1.default.createElement(core_1.CardMedia, { className: classes.cardMedia, image: post.image, title: post.imageText }))))));
}
FeaturedPost.propTypes = {
    post: prop_types_1.default.shape({
        title: prop_types_1.default.string.isRequired,
        company: prop_types_1.default.string.isRequired,
        description: prop_types_1.default.string.isRequired,
        image: prop_types_1.default.string.isRequired,
        imageText: prop_types_1.default.string.isRequired,
    }).isRequired,
};
exports.default = FeaturedPost;
