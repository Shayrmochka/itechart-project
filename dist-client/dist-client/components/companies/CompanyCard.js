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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var styles_1 = require("@material-ui/core/styles");
var react_router_dom_1 = require("react-router-dom");
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var Footer_1 = __importDefault(require("../Footer"));
var Feedback_1 = __importDefault(require("./Feedback"));
var http_hook_1 = __importDefault(require("../../hooks/http.hook"));
var CompanyFeedbacks_1 = __importDefault(require("./CompanyFeedbacks"));
var BarChart_1 = __importDefault(require("../graphs/BarChart"));
var actions_1 = require("../../redux/actions");
var message_hook_1 = __importDefault(require("../../hooks/message.hook"));
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
            paddingBottom: theme.spacing(0),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%',
        },
        logoImgBlock: {
            textAlign: 'center',
            borderRadius: '100px',
            marginBottom: '40px',
        },
        logoImg: {
            width: '140px',
            borderRadius: '100px',
        },
        cardContent: {
            flexGrow: 1,
        },
    });
});
function CompanyCard(_a) {
    var _this = this;
    var company = _a.company;
    var classes = useStyles();
    var dispatch = react_redux_1.useDispatch();
    var isAuthenticated = react_redux_1.useSelector(function (state) { return state.user.isAuthenticated; });
    var currentUserType = react_redux_1.useSelector(function (state) { return state.user.currentUser.type; });
    var history = react_router_dom_1.useHistory();
    var request = http_hook_1.default().request;
    var message = message_hook_1.default();
    var _b = react_1.useState([]), feedbacks = _b[0], setFeedbacks = _b[1];
    var _c = react_1.useState(false), open = _c[0], setOpen = _c[1];
    var handleClickOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var handleOrder = function () {
        dispatch(actions_1.getChosenCompany(company));
        history.push('/create-order');
    };
    var getFeedbacks = react_1.useCallback(function () {
        return __awaiter(_this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, request('/api/feedback/', 'GET', null, {
                                company: company._id,
                            })];
                    case 1:
                        data = _a.sent();
                        setFeedbacks(data);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        message(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }, [company._id, message, request]);
    react_1.useEffect(function () {
        getFeedbacks();
    }, [getFeedbacks]);
    return (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(CssBaseline_1.default, null), react_1.default.createElement("main", null, react_1.default.createElement("div", { className: classes.heroContent }, react_1.default.createElement(core_1.Container, { maxWidth: "sm" }, react_1.default.createElement("div", { className: classes.logoImgBlock }, react_1.default.createElement("img", { className: classes.logoImg, src: company.logo, alt: "company-logo" })), react_1.default.createElement(core_1.Typography, { component: "h1", variant: "h2", align: "center", color: "textPrimary", gutterBottom: true }, company.name), react_1.default.createElement(core_1.Typography, { variant: "h5", align: "center", color: "textSecondary", paragraph: true }, company.description), react_1.default.createElement("div", { className: classes.heroButtons }, react_1.default.createElement(core_1.Grid, { container: true, spacing: 2, justify: "center" }, react_1.default.createElement(core_1.Grid, { item: true }, isAuthenticated && currentUserType === 'user' ? (react_1.default.createElement(core_1.Button, { onClick: handleOrder, variant: "contained", color: "primary" }, "Contact Us")) : (react_1.default.createElement(core_1.Button, { onClick: function () { return history.push('/signin'); }, variant: "contained", color: "primary", disabled: (isAuthenticated && currentUserType !== 'user') }, "Login as User to contact us"))), react_1.default.createElement(core_1.Grid, { item: true }, isAuthenticated && currentUserType === 'user' ? (react_1.default.createElement(core_1.Button, { onClick: handleClickOpen, variant: "outlined", color: "primary" }, "Rate Us")) : (react_1.default.createElement(core_1.Button, { onClick: function () { return history.push('/signin'); }, variant: "outlined", color: "primary", disabled: (isAuthenticated && currentUserType !== 'user') }, "Login as User to Rate Us"))))))), react_1.default.createElement(core_1.Container, { className: classes.cardGrid, maxWidth: "md" }, react_1.default.createElement(core_1.Grid, { container: true, spacing: 4 }, company.typeOfServices.map(function (service) {
        return (react_1.default.createElement(core_1.Grid, { item: true, key: service._id, xs: 12, sm: 6, md: 4 }, react_1.default.createElement(core_1.Card, { className: classes.card }, react_1.default.createElement(core_1.CardMedia, { className: classes.cardMedia, image: service.serviceImage, title: "Image title" }), react_1.default.createElement(core_1.CardContent, { className: classes.cardContent }, react_1.default.createElement(core_1.Typography, { gutterBottom: true, variant: "h5", component: "h2" }, service.serviceName), react_1.default.createElement(core_1.Typography, null, service.serviceDescription)))));
    }))), react_1.default.createElement(BarChart_1.default, { companyId: company._id, feedbacks: feedbacks }), react_1.default.createElement(CompanyFeedbacks_1.default, { feedbacks: feedbacks })), react_1.default.createElement(Footer_1.default, null), react_1.default.createElement(Feedback_1.default, { open: open, handleClose: handleClose, companyId: company._id })));
}
CompanyCard.propTypes = {
    company: prop_types_1.default.shape().isRequired,
};
exports.default = CompanyCard;
