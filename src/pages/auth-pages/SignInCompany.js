import React, { useState, useEffect, useContext } from "react";
import { useMessage } from "../../hooks/message.hook";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";

import {
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
  linksBlock: {
    background: "#c5c7ce",
    width: "100%",
    textAlign: "center",
    borderRadius: "4px",
    padding: "8px 16px",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  links: {
    color: "white",
    textDecoration: "none",
  },
}));

function AuthPage() {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    console.log("Form", form);
    try {
      const dataReq = await request("/api/auth/login-company", "POST", {
        ...form,
      });
      message(dataReq.message);
      auth.login(dataReq.token, dataReq.userId, dataReq.data);
    } catch (e) {}
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in for Companies
        </Typography>
        <form
          className={classes.form}
          noValidate
          // onSubmit={handleSubmit(onSubmit)}
        >
          <NavLink className={classes.links} to="/">
            <div className={classes.linksBlock}>I'm User</div>
          </NavLink>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email or Phone number"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={changeHandler}
            inputRef={register({
              required: "You must provide the email address!",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "You must provide a valid email address!",
              },
            })}
            error={!!errors.email}
          />
          {errors.email && (
            <span className={classes.error}>{errors.email.message}</span>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={changeHandler}
            inputRef={register({
              required: "You must provide a password.",
              minLength: {
                value: 6,
                message: "Your password must be greater than 6 characters",
              },
            })}
            error={!!errors.password}
          />
          {errors.password && (
            <span className={classes.error}>{errors.password.message}</span>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </Button>
        </form>
        <Grid container>
          <NavLink to="/signup-company">
            Don't have any account? Sign Up!
          </NavLink>
        </Grid>
      </div>
    </Container>
  );
}

export default AuthPage;
