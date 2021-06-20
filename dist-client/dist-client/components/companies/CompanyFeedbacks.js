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
var styles_1 = require("@material-ui/core/styles");
var Rating_1 = __importDefault(require("@material-ui/lab/Rating"));
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        icon: {
            marginRight: theme.spacing(2),
        },
        heroContent: {
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            display: 'flex',
        },
        cardMedia: {
            width: '70px',
            height: '70px',
            borderRadius: '100px',
            objectFit: 'cover',
        },
        logoImgBlock: {
            textAlign: 'center',
            borderRadius: '100px',
            marginBottom: '40px',
        },
        logoImg: {
            width: '140px',
        },
        cardContent: {
            flexGrow: 1,
        },
        feedbackContainer: { maxWidth: '50%', flexBasis: '50%', minHeight: '140px' },
        feedbackCard: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '10px',
        },
        feedbackText: { fontSize: '1.2rem', fontWeight: '500' },
        loadFeedbacks: {
            textAlign: 'center',
            marginTop: '30px',
        },
    });
});
function CompanyFeedbacks(_a) {
    var feedbacks = _a.feedbacks;
    var classes = useStyles();
    var _b = react_1.useState(1), counter = _b[0], setCounter = _b[1];
    var _c = react_1.useState([]), feedbacksSorted = _c[0], setFeedbacksSorted = _c[1];
    var handleLoadMore = function () {
        setCounter(counter + 1);
    };
    react_1.useEffect(function () {
        if (feedbacks.length > 0) {
            var sorted = feedbacks
                .sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); })
                .slice(0, counter);
            setFeedbacksSorted(sorted);
        }
    }, [feedbacks, counter]);
    return (react_1.default.createElement(core_1.Container, { className: classes.cardGrid, maxWidth: "md" }, react_1.default.createElement(core_1.Grid, { container: true, spacing: 4 }, feedbacksSorted.map(function (feedback) {
        return (react_1.default.createElement(core_1.Grid, { item: true, key: feedback._id, xs: 12, sm: 6, md: 4, className: classes.feedbackContainer }, react_1.default.createElement(core_1.Card, { className: classes.card }, react_1.default.createElement("div", { className: classes.feedbackCard }, react_1.default.createElement("img", { className: classes.cardMedia, src: feedback.ownerLogo, alt: "feedback-owner-logo" })), react_1.default.createElement(core_1.CardContent, { className: classes.cardContent }, react_1.default.createElement(Rating_1.default, { name: "read-only", value: +feedback.rating, readOnly: true, size: "small" }), react_1.default.createElement(core_1.Typography, { className: classes.feedbackText, component: "h2" }, feedback.ownerFirstName, ' ', feedback.ownerLastName), react_1.default.createElement(core_1.Typography, null, feedback.text)))));
    })), react_1.default.createElement(core_1.Grid, { item: true, className: classes.loadFeedbacks }, feedbacksSorted.length && feedbacks.length > counter ? (react_1.default.createElement(core_1.Button, { onClick: handleLoadMore, variant: "outlined", color: "primary" }, "Load more")) : (react_1.default.createElement(core_1.Button, { disabled: true, variant: "outlined", color: "primary" }, "There are no feedbacks")))));
}
CompanyFeedbacks.propTypes = {
    feedbacks: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
};
exports.default = CompanyFeedbacks;
