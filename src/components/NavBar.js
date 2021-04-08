import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { blue } from "@material-ui/core/colors";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import MailBox from "./nav-bar/MailBox";
import OrderInfo from "./nav-bar/OrderInfo";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  linkTyp: {
    paddingLeft: "20px",
  },
  links: {
    color: "white",
    textDecoration: "none",
    // paddingLeft: "10px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "10ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  avatar: {
    // backgroundColor: blue[100],
    backgroundColor: "white",
    color: blue[600],
  },
  openMenuDialogStyle: {
    marginTop: "40px",
  },
  notifAnswer: {
    marginRight: "10px",
  },
  waiting: {
    color: "orange",
  },
  accepted: {
    color: "green",
  },
  declined: {
    color: "red",
  },
}));

function NavBar(props) {
  //console.log(props.currentUser);

  const classes = useStyles();
  const history = useHistory();
  const { loading, request } = useHttp();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationEl, setNotificationEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(orders[1]);
  const [orderDialogInfo, setOrderDialogInfo] = useState({});
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [sortedOrders, setSortedOrders] = useState([]);
  const [openMail, setOpenMail] = useState(false);
  const [ordersSortedByAccepted, setOrdersSortedByAccepted] = useState([]);

  const fetchOrders = useCallback(async (token) => {
    try {
      const fetched = await request("/api/order", "GET", null, {
        Authorization: `Bearer: ${token}`,
      });
      setOrders(fetched);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (props.currentUser.token && props.isAuthenticated) {
      console.log("RENDER");

      fetchOrders(props.currentUser.token);
    }
  }, [fetchOrders, props, props.currentUser.token, props.isAuthenticated]);

  useEffect(() => {
    if (props.currentUser.type === "user") {
      setSortedOrders(orders.filter((order) => order.status !== "waiting"));
    } else if (props.currentUser.type === "company") {
      setSortedOrders(orders.filter((order) => !order.checked));
    }
  }, [orders]);

  useEffect(() => {
    setOrdersSortedByAccepted(
      orders.filter((order) => order.status === "accepted")
    );
  }, [orders, sortedOrders]);

  const handleClickOpenOrderDialog = (order) => {
    setOpenOrderDialog(true);
    setOrderDialogInfo(order);
  };

  const handleCloseOrderDialog = () => {
    setOpenOrderDialog(false);
    setOrderDialogInfo({});
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleOpenMail = () => {
    setOpenMail(true);
  };

  const handleCloseMail = (value) => {
    setOpenMail(false);
  };

  const isNotificationsOpen = Boolean(notificationEl);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const openProfile = () => {
    history.push("/profile");
    handleMenuClose();
  };

  const logoutHandler = () => {
    handleMenuClose();

    props.logout();

    history.push("/home");
  };

  const createOrder = () => {
    if (props.currentUser.type === "user") {
      return (
        <Typography className={`${classes.title} ${classes.linkTyp}`} noWrap>
          <NavLink className={classes.links} to="/create-order">
            Create Order
          </NavLink>
        </Typography>
      );
    }
  };

  const adminButton = () => {
    if (props.currentUser.role === "Admin") {
      return (
        <Typography className={`${classes.title} ${classes.linkTyp}`} noWrap>
          <NavLink className={classes.links} to="/users">
            Admin panel
          </NavLink>
        </Typography>
      );
    }
  };

  const companyCalendar = () => {
    if (props.currentUser.type === "company") {
      return (
        <Typography className={`${classes.title} ${classes.linkTyp}`} noWrap>
          <NavLink className={classes.links} to="/calendar">
            Company Calendar
          </NavLink>
        </Typography>
      );
    }
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationEl(event.currentTarget);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationEl(null);
    //handleMobileMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={openProfile}>Profile</MenuItem>

      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    </Menu>
  );

  // console.log("ORDERS", orders);
  // console.log("SORTED", sortedOrders);

  const notificationsId = "primary-search-notifications-menu";
  const renderNotifications = (
    <Menu
      className={classes.openMenuDialogStyle}
      anchorEl={notificationEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={notificationsId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isNotificationsOpen}
      onClose={handleNotificationsMenuClose}
    >
      {/* <MenuItem onClick={openProfile}>Kek</MenuItem>

      <MenuItem onClick={logoutHandler}>Logout</MenuItem> */}
      <List>
        {sortedOrders.length ? (
          sortedOrders.map((order) => (
            <ListItem
              button
              //onClick={() => handleListItemClick(order)}
              onClick={() => handleClickOpenOrderDialog(order)}
              key={order._id}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  {props.currentUser.type === "user" ? (
                    <img
                      style={{ width: "100%", objectFit: "cover" }}
                      src={order.company.logo}
                    />
                  ) : (
                    <img
                      style={{ width: "100%", objectFit: "cover" }}
                      src={order.owner.logo}
                    />
                  )}
                </Avatar>
              </ListItemAvatar>
              {props.currentUser.type === "user" ? (
                <>
                  <ListItemText
                    className={classes.notifAnswer}
                    primary={order.company.name}
                  />
                  <ListItemText
                    primary={order.status}
                    className={
                      order.status === "waiting"
                        ? classes.waiting
                        : order.status === "accepted"
                        ? classes.accepted
                        : classes.declined
                    }
                  />
                </>
              ) : (
                // <ListItemText
                //   primary={`${order.owner.firstName} ${order.owner.lastName}`}
                // />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ListItemText
                    style={{ margin: "0" }}
                    primary={`${order.owner.firstName} ${order.owner.lastName}`}
                  />
                  <ListItemText
                    style={{ margin: "0", color: "#a9a9a9" }}
                    primary={order.serviceName}
                  />
                </div>
              )}

              {/* <div style={{ display: "flex", flexDirection: "column" }}>
              <ListItemText
                style={{ margin: "0" }}
                primary={order.ownerEmail}
              />
              <ListItemText
                style={{ margin: "0" }}
                primary={order.ownerEmail}
              />
            </div> */}
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText
              style={{ margin: "0", color: "#a9a9a9" }}
              primary={"There are no notifications!)"}
            />
          </ListItem>
        )}
      </List>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleClickOpen}>
        <IconButton
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="primary-search-notifications-menu"
        >
          <Badge badgeContent={sortedOrders.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications Mobile</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <NavLink className={classes.links} to="/home">
              iTechArt
            </NavLink>
          </Typography>

          {Object.keys(props.currentUser).length ? createOrder() : <></>}
          <Typography className={`${classes.title} ${classes.linkTyp}`} noWrap>
            <NavLink className={classes.links} to="/companies">
              Companies
            </NavLink>
          </Typography>

          {Object.keys(props.currentUser).length ? adminButton() : <></>}
          {Object.keys(props.currentUser).length ? companyCalendar() : <></>}

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            {props.isAuthenticated ? (
              sectionDesctop(
                handleOpenMail,
                ordersSortedByAccepted,
                notificationsId,
                handleNotificationsMenuOpen,
                sortedOrders,
                menuId,
                handleProfileMenuOpen
              )
            ) : (
              <Button onClick={() => history.push("/signin")} color="inherit">
                Login
              </Button>
            )}
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotifications}
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        sortedOrders={sortedOrders}
        handleClickOpenOrderDialog={handleClickOpenOrderDialog}
      />
      <OrderInfo
        open={openOrderDialog}
        onClose={handleCloseOrderDialog}
        orderDialogInfo={orderDialogInfo}
        request={request}
        currentUser={props.currentUser}
        fetchOrders={fetchOrders}
      />
      <MailBox
        open={openMail}
        onClose={handleCloseMail}
        orders={orders}
        ordersSortedByAccepted={ordersSortedByAccepted}
        handleClickOpenOrderDialog={handleClickOpenOrderDialog}
        currentUser={props.currentUser}
      />
    </div>
  );
}

export default NavBar;

function sectionDesctop(
  handleOpenMail,
  ordersSortedByAccepted,
  notificationsId,
  handleNotificationsMenuOpen,
  sortedOrders,
  menuId,
  handleProfileMenuOpen
) {
  return (
    <>
      <IconButton
        aria-label="show new mails"
        color="inherit"
        onClick={handleOpenMail}
      >
        <Badge badgeContent={ordersSortedByAccepted.length} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton
        //onClick={handleClickOpen}
        aria-label="notifications"
        aria-controls={notificationsId}
        aria-haspopup="true"
        onClick={handleNotificationsMenuOpen}
        color="inherit"
      >
        <Badge badgeContent={sortedOrders.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </>
  );
}

////// MOBILE

function SimpleDialog({
  onClose,
  selectedValue,
  open,
  sortedOrders,
  handleClickOpenOrderDialog,
}) {
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">New Orders</DialogTitle>
      <List>
        {sortedOrders.map((order) => (
          <ListItem
            button
            //onClick={() => handleListItemClick(order)}
            onClick={() => handleClickOpenOrderDialog()}
            key={order._id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <img
                  style={{ width: "100%", objectFit: "cover" }}
                  src={order.owner.logo}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={order.owner.email} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
