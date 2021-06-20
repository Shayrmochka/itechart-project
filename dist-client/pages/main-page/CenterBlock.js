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
    var _a;
    return ({
        centerBlock: {
            position: 'relative',
            backgroundColor: theme.palette.grey[800],
            color: theme.palette.common.white,
            marginBottom: theme.spacing(4),
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: 'url(../images/center.jpg)',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
        },
        centerBlockContent: (_a = {
                position: 'relative',
                padding: theme.spacing(3)
            },
            _a[theme.breakpoints.up('md')] = {
                padding: theme.spacing(6),
                paddingRight: 0,
            },
            _a),
        paperImage: { display: 'none' },
        heroContent: {
            padding: theme.spacing(8, 0, 6),
        },
    });
});
function CenterBlock(props) {
    var classes = useStyles();
    var post = props.post;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Container, { maxWidth: "md", component: "main", className: classes.heroContent },
            react_1.default.createElement(core_1.Typography, { component: "h1", variant: "h2", align: "center", color: "textPrimary", gutterBottom: true }, "Cleaning places for the new normal"),
            react_1.default.createElement(core_1.Typography, { variant: "h5", align: "center", color: "textSecondary", component: "p" }, "The world\u2019s leading companies have turned to us for advice on cleaning and hygiene during the global pandemic. As a global organisation delivering services at the frontline, we have gathered many learnings and insights.")),
        react_1.default.createElement(core_1.Container, { maxWidth: "lg" },
            react_1.default.createElement(core_1.Paper, { className: classes.centerBlock },
                react_1.default.createElement("img", { className: classes.paperImage, src: post.image, alt: post.imageText }),
                react_1.default.createElement("div", { className: classes.overlay }),
                react_1.default.createElement(core_1.Grid, { container: true },
                    react_1.default.createElement(core_1.Grid, { item: true, md: 6 },
                        react_1.default.createElement("div", { className: classes.centerBlockContent },
                            react_1.default.createElement(core_1.Typography, { component: "h1", variant: "h3", color: "inherit", gutterBottom: true }, post.title),
                            react_1.default.createElement(core_1.Typography, { variant: "h5", color: "inherit", paragraph: true }, post.description))))))));
}
CenterBlock.propTypes = {
    post: prop_types_1.default.shape({
        title: prop_types_1.default.string.isRequired,
        description: prop_types_1.default.string.isRequired,
        image: prop_types_1.default.string.isRequired,
        imageText: prop_types_1.default.string.isRequired,
        linkText: prop_types_1.default.string.isRequired,
    }).isRequired,
};
exports.default = CenterBlock;
