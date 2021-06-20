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
var react_router_dom_1 = require("react-router-dom");
var styles_1 = require("@material-ui/core/styles");
var Menu_1 = __importDefault(require("@material-ui/icons/Menu"));
var Search_1 = __importDefault(require("@material-ui/icons/Search"));
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../redux/actions");
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? function (a, b) { return descendingComparator(a, b, orderBy); }
        : function (a, b) { return -descendingComparator(a, b, orderBy); };
}
function stableSort(array, comparator) {
    var stabilizedThis = array.map(function (el, index) { return [el, index]; });
    stabilizedThis.sort(function (a, b) {
        var order = comparator(a[0], b[0]);
        if (order !== 0)
            return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(function (el) { return el[0]; });
}
var headCells = [
    {
        id: 'logo', numeric: false, disablePadding: true, label: 'Logotype',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Cleaning Companies',
    },
    {
        id: 'address', numeric: true, disablePadding: false, label: 'Address',
    },
    {
        id: 'rating', numeric: true, disablePadding: false, label: 'Rating',
    },
    {
        id: 'priceList', numeric: true, disablePadding: false, label: 'Price',
    },
    {
        id: 'order', numeric: true, disablePadding: false, label: 'Order',
    },
];
function EnhancedTableHead(props) {
    var classes = props.classes, order = props.order, orderBy = props.orderBy, onRequestSort = props.onRequestSort;
    var createSortHandler = function (property) {
        return function (event) {
            onRequestSort(event, property);
        };
    };
    return (react_1.default.createElement(core_1.TableHead, null, react_1.default.createElement(core_1.TableRow, null, headCells.map(function (headCell) {
        return (react_1.default.createElement(core_1.TableCell, { key: headCell.id, align: headCell.numeric ? 'right' : 'left', sortDirection: orderBy === headCell.id ? order : false }, react_1.default.createElement(core_1.TableSortLabel, { active: orderBy === headCell.id, direction: orderBy === headCell.id ? order : 'asc', onClick: createSortHandler(headCell.id) }, headCell.label, orderBy === headCell.id ? (react_1.default.createElement("span", { className: classes.visuallyHidden }, order === 'desc' ? 'sorted descending' : 'sorted ascending')) : null)));
    }))));
}
var useToolbarStyles = styles_1.makeStyles(function (theme) {
    return ({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        title: {
            flex: '1 1 100%',
        },
        searchBlock: {
            margin: '10px 10px 0 0',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        toolbar: {
            paddingLeft: '10px',
            paddingRight: '0px',
        },
    });
});
var EnhancedTableToolbar = function (_a) {
    var getSearchData = _a.getSearchData;
    var classes = useToolbarStyles();
    var handleSearch = function (event) {
        getSearchData(event.target.value);
    };
    return (react_1.default.createElement(core_1.Toolbar, { className: classes.toolbar }, react_1.default.createElement(core_1.Typography, { className: classes.title, variant: "h6", id: "tableTitle", component: "div" }, "Cleaning Companies"), react_1.default.createElement(core_1.Paper, { component: "form", className: classes.searchBlock }, react_1.default.createElement(core_1.IconButton, { className: classes.iconButton, "aria-label": "menu" }, react_1.default.createElement(Menu_1.default, null)), react_1.default.createElement(core_1.InputBase, { className: classes.input, placeholder: "Search companies", inputProps: { 'aria-label': 'search companies' }, onChange: handleSearch }), react_1.default.createElement(core_1.IconButton, { className: classes.iconButton, "aria-label": "search" }, react_1.default.createElement(Search_1.default, null)))));
};
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        root: {
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        tableRow: {
            cursor: 'pointer',
        },
        logoImg: {
            width: '40px',
            borderRadius: '100px',
        },
    });
});
function CompaniesList(_a) {
    var companies = _a.companies, getSearchData = _a.getSearchData;
    var classes = useStyles();
    var dispatch = react_redux_1.useDispatch();
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var _b = react_1.useState('asc'), order = _b[0], setOrder = _b[1];
    var _c = react_1.useState('name'), orderBy = _c[0], setOrderBy = _c[1];
    var _d = react_1.useState([]), selected = _d[0], setSelected = _d[1];
    var _e = react_1.useState(0), page = _e[0], setPage = _e[1];
    var _f = react_1.useState(5), rowsPerPage = _f[0], setRowsPerPage = _f[1];
    var handleRequestSort = function (event, property) {
        var isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    var handleSelectAllClick = function (event) {
        if (event.target.checked) {
            var newSelecteds = companies.map(function (n) { return n.name; });
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    var history = react_router_dom_1.useHistory();
    var handleClick = function (event, _id) {
        history.push("/company-detail/" + _id);
    };
    var handleCompany = function (event, companyName) {
        event.stopPropagation();
        dispatch(actions_1.getChosenCompany(companyName));
        history.push('/create-order');
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    var isSelected = function (name) { return selected.indexOf(name) !== -1; };
    var emptyRows = rowsPerPage - Math.min(rowsPerPage, companies.length - page * rowsPerPage);
    return (react_1.default.createElement("div", { className: classes.root }, react_1.default.createElement(core_1.Paper, { className: classes.paper }, react_1.default.createElement(EnhancedTableToolbar, { getSearchData: getSearchData }), react_1.default.createElement(core_1.TableContainer, null, react_1.default.createElement(core_1.Table, { className: classes.table, "aria-labelledby": "tableTitle", "aria-label": "enhanced table" }, react_1.default.createElement(EnhancedTableHead, { classes: classes, numSelected: selected.length, order: order, orderBy: orderBy, onSelectAllClick: handleSelectAllClick, onRequestSort: handleRequestSort, rowCount: companies.length }), react_1.default.createElement(core_1.TableBody, null, stableSort(companies, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(function (row, index) {
        var isItemSelected = isSelected(row.name);
        var labelId = "enhanced-table-checkbox-" + index;
        return (react_1.default.createElement(core_1.TableRow, { hover: true, onClick: function (event) { return handleClick(event, row._id); }, role: "checkbox", "aria-checked": isItemSelected, tabIndex: -1, key: row.name, selected: isItemSelected, className: classes.tableRow }, react_1.default.createElement(core_1.TableCell, { component: "th", id: labelId, scope: "row" }, react_1.default.createElement("img", { className: classes.logoImg, src: row.logo, alt: "logo" })), react_1.default.createElement(core_1.TableCell, { align: "left" }, row.name), react_1.default.createElement(core_1.TableCell, { align: "right" }, row.address), react_1.default.createElement(core_1.TableCell, { align: "right" }, row.rating), react_1.default.createElement(core_1.TableCell, { align: "right" }, row.priceList, "%"), react_1.default.createElement(core_1.TableCell, { align: "right" }, user.isAuthenticated
            && user.currentUser.type === 'user' ? (react_1.default.createElement(core_1.Button, { onClick: function (event) { return handleCompany(event, row); }, variant: "outlined", color: "primary" }, "Choose")) : (react_1.default.createElement(core_1.Button, { onClick: function (event) {
                event.stopPropagation();
                history.push('/signin');
            }, variant: "outlined", color: "primary", disabled: (user.isAuthenticated && user.currentUserType !== 'user') }, "Login as User")))));
    }), emptyRows > 0 && (react_1.default.createElement(core_1.TableRow, null, react_1.default.createElement(core_1.TableCell, { colSpan: 6 })))))), react_1.default.createElement(core_1.TablePagination, { rowsPerPageOptions: [5, 10, 20], component: "div", count: companies.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }))));
}
exports.default = CompaniesList;
CompaniesList.propTypes = {
    getSearchData: prop_types_1.default.func.isRequired,
    companies: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
    // companies: PropTypes.shape({
    //   _id: PropTypes.string,
    //   checked: PropTypes.bool,
    //   typeOfService: PropTypes.string,
    //   serviceName: PropTypes.string,
    // }).isRequired,
};
// CompaniesList.defaultProps = {
//   getSearchData: '',
// };
EnhancedTableToolbar.propTypes = {
    getSearchData: prop_types_1.default.func.isRequired,
};
// EnhancedTableToolbar.defaultProps = {
//   getSearchData: '',
// };
EnhancedTableHead.propTypes = {
    classes: prop_types_1.default.shape().isRequired,
    order: prop_types_1.default.string.isRequired,
    orderBy: prop_types_1.default.string.isRequired,
    onRequestSort: prop_types_1.default.func.isRequired,
};
