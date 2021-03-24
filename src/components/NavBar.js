import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
    backgroundColor: blue[100],
    color: blue[600],
  },
  openMenuDialogStyle: {
    marginTop: "40px",
  },
}));

function NavBar(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationEl, setNotificationEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(orders[1]);
  const [orderDialogInfo, setOrderDialogInfo] = useState({});
  const [openOrderDialog, setOpenOrderDialog] = useState(false);

  const handleClickOpenOrderDialog = (order) => {
    setOrderDialogInfo(order);
    console.log("ORDER", order);
    setOpenOrderDialog(true);
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

  const isNotificationsOpen = Boolean(notificationEl);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();
  const auth = useContext(AuthContext);

  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const message = useMessage();

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/order", "GET", null, {
        Authorization: `Bearer: ${token}`,
      });
      setOrders(fetched);
      message(fetched.message);
      console.log(fetched);
    } catch (e) {}
  }, [token, request]);
  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);
  // if (loading) {
  //   return <Loader />;
  // }

  const openProfile = () => {
    history.push("/profile");
    handleMenuClose();
  };

  const logoutHandler = () => {
    handleMenuClose();
    auth.logout();
    history.push("/");
  };

  useEffect(() => {
    setCurrentUser(props.currentUser);
  }, [props]);

  const adminButton = () => {
    if (props.currentUser.role === "Admin") {
      return (
        <Typography className={`${classes.title} ${classes.linkTyp}`} noWrap>
          <NavLink className={classes.links} to="/users">
            Users
          </NavLink>
        </Typography>
      );
    }
  };

  const renderUserInfoGrid = () => {
    if (currentUser !== null) {
      return (
        <Grid item xs={12} sm={3}>
          {currentUser.hasOwnProperty("role") ? (
            <>
              <Typography>
                {currentUser.firstName} {currentUser.lastName}
              </Typography>
              <Typography>{currentUser.role}</Typography>
            </>
          ) : (
            <Typography>{currentUser.name}</Typography>
          )}
        </Grid>
      );
    }

    return (
      <Grid item xs={12} sm={3}>
        <Typography>Loading...</Typography>
      </Grid>
    );
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
        {orders.map((order) => (
          <ListItem
            button
            //onClick={() => handleListItemClick(order)}
            onClick={() => handleClickOpenOrderDialog(order)}
            key={order._id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <img
                  style={{ width: "100%", objectFit: "cover" }}
                  src={order.ownerLogo}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={order.ownerEmail} />
          </ListItem>
        ))}
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
          <Badge badgeContent={orders.length} color="secondary">
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

          <Typography className={`${classes.title} ${classes.linkTyp}`} noWrap>
            <NavLink className={classes.links} to="/create-order">
              Create Order
            </NavLink>
          </Typography>
          <Typography className={`${classes.title} ${classes.linkTyp}`} noWrap>
            <NavLink className={classes.links} to="/companies">
              Companies
            </NavLink>
          </Typography>
          {props.currentUser === null ? "Loading" : adminButton()}
          {renderUserInfoGrid()}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => console.log("qwe")}
            >
              <Badge badgeContent={4} color="secondary">
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
              <Badge badgeContent={orders.length} color="secondary">
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
        orders={orders}
        handleClickOpenOrderDialog={handleClickOpenOrderDialog}
      />
      <ExtendedOrderDialog
        open={openOrderDialog}
        onClose={handleCloseOrderDialog}
        orderDialogInfo={orderDialogInfo}
      />
    </div>
  );
}

export default NavBar;

function SimpleDialog({
  onClose,
  selectedValue,
  open,
  orders,
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
        {orders.map((order) => (
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
                  src={order.ownerLogo}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={order.ownerEmail} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

function ExtendedOrderDialog({ open, onClose, orderDialogInfo }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {orderDialogInfo.services}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Order from: {orderDialogInfo.ownerEmail}
          </DialogContentText>
          <DialogContentText>
            Date Cleaning: {orderDialogInfo.dateCleaning}
          </DialogContentText>
          <DialogContentText>
            Flat Description: {orderDialogInfo.flatDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Accept
          </Button>
          <Button onClick={onClose} color="primary" autoFocus>
            Decline
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
