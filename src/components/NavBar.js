import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  links: {
    color: "white",
    textDecoration: "none",
    padding: 20,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  const adminButton = () => {
    if (props.currentUser.role === "Admin") {
      return (
        <NavLink className={classes.links} to="/users">
          Users
        </NavLink>
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Grid container spacing={1}>
            <NavLink className={classes.links} to="/create-order">
              Create Order
            </NavLink>
            <NavLink className={classes.links} to="/companies">
              Companies
            </NavLink>

            {props.currentUser === null ? "Loading" : adminButton()}
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} sm={3}>
              <Typography>
                {props.currentUser === null
                  ? "Loading"
                  : `${props.currentUser.firstName} ${props.currentUser.lastName}`}
              </Typography>
              <Typography>
                {props.currentUser === null
                  ? "Loading"
                  : props.currentUser.role}
              </Typography>
            </Grid>
          </Grid>
          <Button color="inherit" onClick={logoutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
