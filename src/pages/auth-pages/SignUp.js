import React, { useState, useEffect } from "react";
import { useMessage } from "../../hooks/message.hook";
import { useHttp } from "../../hooks/http.hook";
import {
  Avatar,
  Button,
  Container,
  Grid,
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
    marginTop: theme.spacing(3),
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
    marginBottom: "10px",
  },
  links: {
    color: "white",
    textDecoration: "none",
  },
}));

function SignUp() {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();

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
      const data = await request("/api/auth/register", "POST", {
        ...form,
      });
      message(data.message);
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
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <NavLink className={classes.links} to="/signin-company">
            <div className={classes.linksBlock}>For Cleaning Companies</div>
          </NavLink>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={changeHandler}
                inputRef={register({ required: true })}
                error={!!errors.firstName}
              />
              {errors.firstName && (
                <span className={classes.error}>This field is required</span>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={changeHandler}
                inputRef={register({ required: true })}
                error={!!errors.firstName}
              />
              {errors.firstName && (
                <span className={classes.error}>This field is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone number"
                name="phone"
                autoComplete="phone-number"
                onChange={changeHandler}
                inputRef={register({
                  required: "You must provide the phone number!",
                  pattern: {
                    value: /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/,
                    message: "You must provide a valid phone number!",
                  },
                })}
                error={!!errors.phone}
              />
              {errors.phone && (
                <span className={classes.error}>{errors.phone.message}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={changeHandler}
                autoComplete="current-password"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
                onChange={changeHandler}
                inputRef={register({
                  required: "You must provide a password.",
                  minLength: {
                    value: 6,
                    message: "Your password must be greater than 6 characters",
                  },
                })}
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <span className={classes.error}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
        </form>
        <Grid>
          <NavLink to="/">Already have an account? SignIn!</NavLink>
        </Grid>
      </div>
    </Container>
  );
}

export default SignUp;
