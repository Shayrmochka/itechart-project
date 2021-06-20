"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var react_hook_form_1 = require("react-hook-form");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var http_hook_1 = __importDefault(require("../../../hooks/http.hook"));
var CompaniesList_1 = __importDefault(require("../../companies/CompaniesList"));
var message_hook_1 = __importDefault(require("../../../hooks/message.hook"));
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        formControl: {
            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        error: {
            color: 'red',
        },
        buttons: {
            width: '98%',
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        },
    });
});
function AddressForm(_a) {
    var _this = this;
    var updateFinalForm = _a.updateFinalForm;
    var isAuthenticated = react_redux_1.useSelector(function (state) { return state.user.isAuthenticated; });
    var currentUserType = react_redux_1.useSelector(function (state) { return state.user.currentUser.type; });
    var dispatchedCompany = react_redux_1.useSelector(function (state) { return state.company.chosenCompany; });
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.errors;
    var classes = useStyles();
    var history = react_router_dom_1.useHistory();
    var _c = http_hook_1.default(), loading = _c.loading, request = _c.request;
    var message = message_hook_1.default();
    var _d = react_1.useState({}), cleaningService = _d[0], setCleaningService = _d[1];
    var _e = react_1.useState({
        date: new Date().toISOString().slice(0, 16),
    }), addressForm = _e[0], setAddressForm = _e[1];
    var _f = react_1.useState(false), open = _f[0], setOpen = _f[1];
    var _g = react_1.useState([]), companies = _g[0], setCompanies = _g[1];
    var _h = react_1.useState([]), services = _h[0], setServices = _h[1];
    var _j = react_1.useState(null), searchCompanies = _j[0], setSearchCompanies = _j[1];
    var _k = react_1.useState([1]), flatCounter = _k[0], setFlatCounter = _k[1];
    var getSearchData = function (value) {
        setSearchCompanies(companies.filter(function (company) {
            return (company.name + " " + company.address)
                .toLowerCase()
                .includes(value.toLowerCase());
        }));
    };
    var changeHandler = function (event) {
        var _a;
        setAddressForm(__assign(__assign(__assign({}, addressForm), cleaningService), (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var handleChange = function (event) {
        setCleaningService(event.target.value);
        setSearchCompanies(companies.filter(function (el) { return el.typeOfServices.includes(event.target.value._id); }));
    };
    var handleClickOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var handleUpdateFinalForm = function () {
        updateFinalForm(__assign(__assign({}, addressForm), {
            // ...chosenCompany,
            companyName: dispatchedCompany.name, companyId: dispatchedCompany._id, companyLogo: dispatchedCompany.logo, priceList: dispatchedCompany.priceList
        }));
    };
    // const updateChosenCompany = () => {
    //   setChosenCompany({
    //     companyName: dispatchedCompany.name,
    //     companyId: dispatchedCompany._id,
    //     companyLogo: dispatchedCompany.logo,
    //     priceList: dispatchedCompany.priceList,
    //   });
    //   handleClose();
    // };
    // console.log('test #2');
    // const fetchCompanies = useCallback(async () => {
    //   try {
    //     const fetchedCompanies = await request('/api/company', 'GET', null);
    //     setCompanies(fetchedCompanies);
    //   } catch (e) { message(e); }
    // }, [message, request]);
    // useEffect(() => {
    //   fetchCompanies();
    //   console.log('test #Comp');
    // }, [fetchCompanies]);
    // useEffect(() => {
    //   updateChosenCompany();
    //   console.log('test #Chosen');
    // }, [dispatchedCompany]);
    var fetchData = react_1.useCallback(function () {
        return __awaiter(_this, void 0, void 0, function () {
            var fetchedCompanies, fetchedServices, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, request('/api/company', 'GET', null)];
                    case 1:
                        fetchedCompanies = _a.sent();
                        setCompanies(fetchedCompanies);
                        return [4 /*yield*/, request('/api/service', 'GET', null)];
                    case 2:
                        fetchedServices = _a.sent();
                        setServices(fetchedServices);
                        setCleaningService(fetchedServices[0]);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        message(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }, [message, request]);
    react_1.useEffect(function () {
        // fetchCompanies();
        fetchData();
        // console.log('test #Serv');
    }, [fetchData]);
    return (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(core_1.Typography, { variant: "h6", gutterBottom: true }, "Cleaning details"), react_1.default.createElement("form", { className: classes.form, noValidate: true }, react_1.default.createElement(core_1.Grid, { container: true, spacing: 3 }, react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.TextField, { required: true, id: "address", name: "address", label: "Address", fullWidth: true, autoComplete: "shipping address-line", onChange: changeHandler, inputRef: register({
            required: true,
        }), error: !!errors.address }), errors.address && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.FormControl, { className: classes.formControl }, react_1.default.createElement(core_1.InputLabel, { id: "select-cleaning-service-label" }, "Cleaning Service"), react_1.default.createElement(core_1.Select, { name: "services", labelId: "select-cleaning-service-label", id: "select-cleaning-service", value: cleaningService, onChange: handleChange }, services.map(function (e) { return (react_1.default.createElement(core_1.MenuItem, { value: e, key: e._id }, e.serviceName)); })))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 8 }, react_1.default.createElement(core_1.TextField, { required: true, id: "flatDescription", name: "flatDescription", label: "Flat/House description", fullWidth: true, onChange: changeHandler, inputRef: register({ required: true }), error: !!errors.flatDescription }), errors.flatDescription && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 4 }, react_1.default.createElement(core_1.TextField, { required: true, fullWidth: true, id: "bathrooms", label: "Bathrooms", name: "bathrooms", onChange: changeHandler, inputRef: register({
            required: 'You must enter number of bathrooms!',
            pattern: {
                value: /^[0-9\b]+$/,
                message: 'You must enter a number!',
            },
        }), error: !!errors.bathrooms }), errors.bathrooms && (react_1.default.createElement("span", { className: classes.error }, errors.bathrooms.message))), flatCounter.map(function (e, i) {
        var roomId = "room" + i;
        return (react_1.default.createElement(core_1.Grid, { item: true, xs: 12, sm: 4, key: roomId }, react_1.default.createElement(core_1.TextField, { required: true, fullWidth: true, id: roomId, label: "Room " + (i + 1), name: roomId, onChange: changeHandler, inputRef: register({
                required: 'You must enter the area of the room!',
                pattern: {
                    value: /^[0-9\b]+$/,
                    message: 'All your rooms must be an area!',
                },
            }), error: !!errors.roomId }), errors.roomId && (react_1.default.createElement("span", { className: classes.error }, errors.roomId.message))));
    }), react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.Button, { onClick: function () { return setFlatCounter(__spreadArray(__spreadArray([], flatCounter), [flatCounter.push(1)])); }, variant: "contained" }, "Add room")), react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.TextField, { id: "datetime-local", name: "date", label: "Choose Date", type: "datetime-local", defaultValue: addressForm.date, onChange: changeHandler, InputLabelProps: {
            shrink: true,
        } })), react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.TextField, { required: true, id: "company", name: "company", value: dispatchedCompany.name, label: "Company", fullWidth: true, disabled: true, onChange: changeHandler, inputRef: register({ required: true }), error: !!errors.firstName }), errors.firstName && (react_1.default.createElement("span", { className: classes.error }, "This field is required"))), react_1.default.createElement(core_1.Grid, { item: true, xs: 12 }, react_1.default.createElement(core_1.Button, { onClick: handleClickOpen, variant: "contained" }, "Check other offers")), react_1.default.createElement("div", { className: classes.buttons }, isAuthenticated && currentUserType === 'user' ? (react_1.default.createElement(core_1.Button, { variant: "contained", color: "primary", onClick: handleSubmit(handleUpdateFinalForm), className: classes.button }, "Next")) : (react_1.default.createElement(core_1.Button, { variant: "contained", color: "primary", onClick: function () {
            history.push('/signin');
        }, className: classes.button, disabled: (isAuthenticated && currentUserType !== 'user') }, "Please login as User")))), react_1.default.createElement(core_1.Dialog, { fullWidth: true, maxWidth: false, open: open, onClose: handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" }, react_1.default.createElement(core_1.DialogTitle, { id: "alert-dialog-title" }, "Choose Cleaning Company"), react_1.default.createElement(core_1.DialogContent, null, react_1.default.createElement(core_1.DialogContentText, { id: "alert-dialog-description" }, "A list of companies based on the selected parameters."), !loading && (react_1.default.createElement(CompaniesList_1.default, { companies: searchCompanies === null ? companies : searchCompanies, getSearchData: getSearchData }))), react_1.default.createElement(core_1.DialogActions, null, react_1.default.createElement(core_1.Button, { onClick: handleClose, color: "primary", autoFocus: true }, "Close"))))));
}
AddressForm.propTypes = {
    updateFinalForm: prop_types_1.default.func.isRequired,
};
exports.default = AddressForm;
