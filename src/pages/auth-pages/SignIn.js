import React, { useState, useEffect, useContext } from "react";
import { useMessage } from "../../hooks/message.hook";
import { useHttp } from "../../hooks/http.hook";

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

import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../redux/actions";
import { useAuth } from "../../hooks/auth.hooh";
import SocialButton from "../../components/SocialButton";

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
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();

  const { login } = useAuth();
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (data) => {
    try {
      const dataReq = await request("/api/auth/login", "POST", {
        ...form,
      });
      //message(dataReq.message);
      login(dataReq.token);
      dispatch(getCurrentUser({ ...dataReq.user, token: dataReq.token }));
    } catch (e) {}
  };

  const handleSocialLogin = async (user) => {
    //console.log(user.profile);
    try {
      const response = await request(
        "/api/social-auth/google",
        "POST",
        user.profile
      );
      //message(dataReq.message);
      console.log(response);
      login(response.token);
      dispatch(getCurrentUser({ ...response.user, token: response.token }));
    } catch (e) {}
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
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
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          // onSubmit={handleSubmit(onSubmit)}
        >
          {/* <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          > */}
          <NavLink className={classes.links} to="/signin-company">
            <div className={classes.linksBlock}>For Cleaning Companies</div>
          </NavLink>
          {/* </Button> */}
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
          <SocialButton
            provider="google"
            appId="525057698721-clrqeoja3b3jtfr2qt5sh0jctdbmbu8v.apps.googleusercontent.com"
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
          >
            Login with Google
          </SocialButton>
          {/* <Grid item xs={12} sm={6}>
            <SocialButton
              provider="google"
              appId="525057698721-clrqeoja3b3jtfr2qt5sh0jctdbmbu8v.apps.googleusercontent.com"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with Google
            </SocialButton>
          </Grid>

          <Grid item xs={12} sm={6}>
            <SocialButton
              provider="github"
              appId="e7619529ec8d2c14eedb"
              gatekeeper="https://github.com/login/oauth/authorize"
              redirect="http://localhost:3000/home"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with GitHub
            </SocialButton>
          </Grid> */}
        </Grid>
        <Grid container style={{ marginTop: "10px" }}>
          <NavLink to="/signup">Don't have any account? Sign Up!</NavLink>
        </Grid>
      </div>
    </Container>
  );
}

export default AuthPage;
