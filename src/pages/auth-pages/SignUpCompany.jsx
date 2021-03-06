import React, { useState, useEffect, useCallback } from 'react';
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import useHttp from '../../hooks/http.hook';
import useMessage from '../../hooks/message.hook';

import ServicesBlock from '../../components/auth-pages/ServicesBlock';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
  },
  linksBlock: {
    background: '#c5c7ce',
    width: '100%',
    textAlign: 'center',
    borderRadius: '4px',
    padding: '8px 16px',
    textTransform: 'uppercase',
    fontWeight: 500,
    marginBottom: '10px',
  },
  links: {
    color: 'white',
    textDecoration: 'none',
  },
}));

function SignUp() {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();

  const message = useMessage();
  const {
    loading, request,
  } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [services, setServices] = useState([]);

  const fetchServices = useCallback(async () => {
    const getChecked = (e, checked) => ({
      ...e, checked,
    });
    try {
      const fetched = await request('/api/service', 'GET', null);

      const data = fetched.map((e, i) => (i === 0 ? getChecked(true) : getChecked(false)));

      setServices(data);
    } catch (e) { message(e); }
  }, [message, request]);
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const onSubmit = async () => {
    try {
      const data = await request('/api/auth/register-company', 'POST', {
        ...form,
        services,
      });
      message(data.message);
    } catch (e) { message(e); }
  };

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeServices = (targetService) => {
    const service = targetService;
    service.checked = !service.checked;
    setServices(
      services.map((e) => (e._id === service._id ? service : e)),
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up for Companies
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <NavLink className={classes.links} to="/signup">
            <div className={classes.linksBlock}>I&apos;m User</div>
          </NavLink>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Company Name"
                name="name"
                autoComplete="name"
                onChange={changeHandler}
                inputRef={register({ required: true })}
                error={!!errors.name}
              />
              {errors.name && (
                <span className={classes.error}>This field is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Company Description"
                name="description"
                autoComplete="description"
                onChange={changeHandler}
                inputRef={register({ required: true })}
                error={!!errors.description}
              />
              {errors.description && (
                <span className={classes.error}>This field is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={changeHandler}
                inputRef={register({ required: true })}
                error={!!errors.address}
              />
              {errors.address && (
                <span className={classes.error}>This field is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <ServicesBlock
                handleChangeServices={handleChangeServices}
                services={services}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="priceList"
                label="Price List"
                name="priceList"
                autoComplete="priceList"
                onChange={changeHandler}
                inputRef={register({ required: true })}
                error={!!errors.priceList}
              />
              {errors.priceList && (
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
                  required: 'You must provide the email address!',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'You must provide a valid email address!',
                    // value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\
                    // .,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.
                    // [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={changeHandler}
                autoComplete="current-password"
                inputRef={register({
                  required: 'You must provide a password.',
                  minLength: {
                    value: 6,
                    message: 'Your password must be greater than 6 characters',
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
                  required: 'You must provide a password.',
                  minLength: {
                    value: 6,
                    message: 'Your password must be greater than 6 characters',
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
          <NavLink to="/signin-company">
            Already have an account? SignIn!
          </NavLink>
        </Grid>
      </div>
    </Container>
  );
}

export default SignUp;
