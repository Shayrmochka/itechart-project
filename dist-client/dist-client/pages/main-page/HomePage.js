"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var core_1 = require("@material-ui/core");
var FeaturedPost_1 = __importDefault(require("./FeaturedPost"));
var Footer_1 = __importDefault(require("../../components/Footer"));
var CenterBlock_1 = __importDefault(require("./CenterBlock"));
var ImageCarousel_1 = __importDefault(require("../../components/ImageCarousel"));
var PriceBlock_1 = __importDefault(require("./PriceBlock"));
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        mainGrid: {
            marginTop: theme.spacing(3),
        },
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
        featuredWrapper: { marginTop: '20px' },
    });
});
var centerPost = {
    title: 'Enrich the travelling experience',
    description: 'A clean, safe airport keeps travellers healthy and happy, while spotless shopping and dining facilities play a crucial role in strengthening an airport’s reputation.',
    image: '../images/center.jpg',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};
var featuredPosts = [
    {
        title: 'Fuel productivity',
        company: 'ISS',
        description: 'A clean and hygienic workplace can help teams reach peak focus and ensure 100% uptime by reducing the risk of malfunctions, errors or accidents – and, crucially, decrease the number of sick days.',
        image: '../images/featured_1.jpg',
        imageText: 'Image Text',
    },
    {
        title: 'Help patients heal',
        company: 'ISS',
        description: 'Support patients and their families on their road to recovery with clean, safe hospital environments. With healthcare housekeeping and medical equipment cleaning.',
        image: '../images/featured_2.jpg',
        imageText: 'Image Text',
    },
];
var tiers = [
    {
        title: 'Laundry',
        price: '40+',
        description: 'A superb add on to offer homeowners where you wash, dry, and fold clothes while cleaning their house.',
        buttonText: 'Create Order',
        buttonVariant: 'outlined',
    },
    {
        title: 'Basic',
        subheader: 'Most popular',
        price: '25+',
        description: 'A service that involves general house cleaning jobs. You’ll attend to areas like the kitchen, lounge, bathroom, and bedroom. Tasks include mopping, vacuuming, dusting, polishing, sweeping.',
        buttonText: 'Create Order',
        buttonVariant: 'contained',
    },
    {
        title: 'Sanitization',
        price: '60+',
        description: 'The sanitizing of homes and office spaces is currently in high demand. Squeaky Clean House is one example of a cleaning business offering.',
        buttonText: 'Create Order',
        buttonVariant: 'outlined',
    },
];
function HomePage() {
    var classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(CssBaseline_1.default, null), react_1.default.createElement(core_1.Container, { maxWidth: "lg" }, react_1.default.createElement("main", null, react_1.default.createElement(ImageCarousel_1.default, null), react_1.default.createElement(core_1.Grid, { container: true, spacing: 4, className: classes.featuredWrapper }, featuredPosts.map(function (post) { return (react_1.default.createElement(FeaturedPost_1.default, { key: post.title, post: post })); })), react_1.default.createElement(core_1.Grid, { container: true, spacing: 5, className: classes.mainGrid }))), react_1.default.createElement(CenterBlock_1.default, { post: centerPost }), react_1.default.createElement(PriceBlock_1.default, { tiers: tiers }), react_1.default.createElement(Footer_1.default, null)));
}
exports.default = HomePage;
