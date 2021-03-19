import React, { useContext } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  card: {
    minWidth: 180,
    maxWidth: 200,
    minHeight: 240,
    margin: 10,
    cursor: "pointer",
    transition: "0.5s",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.2)",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  cardBanned: {
    minWidth: 180,
    maxWidth: 200,
    minHeight: 240,
    margin: 10,
    cursor: "pointer",
    transition: "0.5s",
    boxShadow: "0 3px 6px 0 rgb(255 0 0 / 84%)",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: "none",
    textTransform: "none",
  },
});

function UsersList({ users }) {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const blockHandler = async (user) => {
    try {
      await request("/api/user/update", "POST", user, {
        Authorization: `Bearer ${auth.token}`,
      });
    } catch (e) {}
  };

  if (!users.length) {
    return <div>No Users!</div>;
  }
  return (
    <div className={classes.root}>
      {users.map((user) => {
        return (
          <Card
            className={user.isActive ? classes.card : classes.cardBanned}
            key={user._id}
          >
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {user.role === "Admin" ? "Admin" : "User"}
              </Typography>
              <Typography variant="h6" component="h2">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {user.isActive ? "Active" : "Banned"}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {user.email}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {user.phone}
              </Typography>
            </CardContent>
            <CardActions>
              {user.isActive ? (
                <Button size="small" onClick={() => blockHandler(user)}>
                  Block
                </Button>
              ) : (
                <Button size="small" onClick={() => blockHandler(user)}>
                  Unblock
                </Button>
              )}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default UsersList;
