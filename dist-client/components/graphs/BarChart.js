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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_chartjs_2_1 = require("react-chartjs-2");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var http_hook_1 = __importDefault(require("../../hooks/http.hook"));
var message_hook_1 = __importDefault(require("../../hooks/message.hook"));
var useStyles = styles_1.makeStyles(function (theme) { return ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(0),
        backgroundColor: 'transparent',
    },
    card: {
        height: '100%',
        display: 'flex',
    },
    cardBox: {
        maxWidth: '50%',
        flexBasis: '50%',
        minHeight: '140px',
        backgroundColor: 'transparent',
    },
    barContainer: {
        maxWidth: '50%',
        flexBasis: '50%',
        minHeight: '140px',
    },
}); });
function BarChart(_a) {
    var _this = this;
    var companyId = _a.companyId, feedbacks = _a.feedbacks;
    var classes = useStyles();
    var request = http_hook_1.default().request;
    var message = message_hook_1.default();
    var _b = react_1.useState([]), orders = _b[0], setOrders = _b[1];
    var _c = react_1.useState({}), marks = _c[0], setMarks = _c[1];
    var _d = react_1.useState([]), ordersSortedByAccepted = _d[0], setOrdersSortedByAccepted = _d[1];
    var fetchOrders = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var fetched, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request('/api/order/orders-chart', 'GET', null, {
                            id: companyId,
                        })];
                case 1:
                    fetched = _a.sent();
                    setOrders(fetched);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    message(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [companyId, message, request]);
    react_1.useEffect(function () {
        fetchOrders();
    }, [fetchOrders]);
    react_1.useEffect(function () {
        var getMarks = function () {
            var defaultMarks = {
                one: 0,
                two: 0,
                three: 0,
                four: 0,
                five: 0,
            };
            feedbacks.forEach(function (e) {
                switch (e.rating) {
                    case '1':
                        setMarks(defaultMarks.one += 1);
                        break;
                    case '2':
                        setMarks(defaultMarks.two += 1);
                        break;
                    case '3':
                        setMarks(defaultMarks.three += 1);
                        break;
                    case '4':
                        setMarks(defaultMarks.four += 1);
                        break;
                    case '5':
                        setMarks(defaultMarks.five += 1);
                        break;
                    default: setMarks(defaultMarks);
                }
            });
            setMarks(defaultMarks);
        };
        getMarks();
    }, [feedbacks]);
    react_1.useEffect(function () {
        setOrdersSortedByAccepted(orders.filter(function (order) { return order.status === 'accepted'; }));
    }, [orders]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(core_1.Container, { className: classes.cardGrid, maxWidth: "md" },
            react_1.default.createElement(core_1.Grid, { container: true, spacing: 4 },
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 6, md: 4, className: classes.cardBox },
                    react_1.default.createElement(core_1.Card, { className: classes.card },
                        react_1.default.createElement(react_chartjs_2_1.Bar, { data: {
                                labels: ['1', '2', '3', '4', '5'],
                                datasets: [
                                    {
                                        label: 'Marks',
                                        data: [
                                            marks.one,
                                            marks.two,
                                            marks.three,
                                            marks.four,
                                            marks.five,
                                        ],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.4)',
                                            'rgba(255, 159, 64, 0.4)',
                                            'rgba(255, 205, 86, 0.4)',
                                            'rgba(54, 162, 235, 0.4)',
                                            'rgba(75, 192, 192, 0.4)',
                                        ],
                                        borderColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(255, 159, 64)',
                                            'rgb(255, 205, 86)',
                                            'rgb(54, 162, 235)',
                                            'rgb(75, 192, 192)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }, height: 200, width: 400, options: {
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                            },
                                        },
                                    ],
                                },
                            } }))),
                react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 6, md: 4, className: classes.barContainer },
                    react_1.default.createElement(core_1.Card, { className: classes.card },
                        react_1.default.createElement(react_chartjs_2_1.Doughnut, { data: {
                                labels: ['Declined orders', 'Accepted orders'],
                                datasets: [
                                    {
                                        label: 'Orders',
                                        data: [
                                            orders.length - ordersSortedByAccepted.length,
                                            ordersSortedByAccepted.length,
                                        ],
                                        backgroundColor: ['rgba(255, 99, 132,1)', '#78e08f'],
                                        borderColor: ['white', 'white'],
                                        hoverOffset: 4,
                                    },
                                ],
                            }, height: 200, width: 400, options: {
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                            },
                                        },
                                    ],
                                },
                            } })))))));
}
BarChart.propTypes = {
    companyId: prop_types_1.default.string.isRequired,
    feedbacks: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
};
exports.default = BarChart;
