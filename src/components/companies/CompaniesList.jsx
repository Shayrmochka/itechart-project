import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {
  Button,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenCompany } from '../../redux/actions';

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
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
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
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
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
}));

const EnhancedTableToolbar = ({ getSearchData }) => {
  const classes = useToolbarStyles();

  const handleSearch = (event) => {
    getSearchData(event.target.value);
  };

  return (
    <Toolbar className={classes.toolbar}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Cleaning Companies
      </Typography>

      <Paper component="form" className={classes.searchBlock}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search companies"
          inputProps={{ 'aria-label': 'search companies' }}
          onChange={handleSearch}
        />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
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
}));

export default function CompaniesList({ companies, getSearchData }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = companies.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const history = useHistory();
  const handleClick = (event, _id) => {
    history.push(`/company-detail/${_id}`);
  };

  const handleCompany = (event, companyName) => {
    event.stopPropagation();
    dispatch(getChosenCompany(companyName));
    history.push('/create-order');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, companies.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar getSearchData={getSearchData} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={companies.length}
            />
            <TableBody>
              {stableSort(companies, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      className={classes.tableRow}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        <img
                          className={classes.logoImg}
                          src={row.logo}
                          alt="logo"
                        />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">{row.rating}</TableCell>
                      <TableCell align="right">
                        {row.priceList}
                        %
                      </TableCell>
                      <TableCell align="right">
                        {user.isAuthenticated
                        && user.currentUser.type === 'user' ? (
                          <Button
                            onClick={(event) => handleCompany(event, row)}
                            variant="outlined"
                            color="primary"
                          >
                            Choose
                          </Button>
                          ) : (
                            <Button
                              onClick={(event) => {
                                event.stopPropagation();
                                history.push('/signin');
                              }}
                              variant="outlined"
                              color="primary"
                              disabled={(user.isAuthenticated && user.currentUserType !== 'user')}
                            >
                              Login as User
                            </Button>
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={companies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

CompaniesList.propTypes = {
  getSearchData: PropTypes.func.isRequired,
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  getSearchData: PropTypes.func.isRequired,
};

// EnhancedTableToolbar.defaultProps = {
//   getSearchData: '',
// };

EnhancedTableHead.propTypes = {
  classes: PropTypes.shape().isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};
