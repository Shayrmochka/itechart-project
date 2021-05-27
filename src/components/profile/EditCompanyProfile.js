import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { getCurrentUser } from "../../redux/actions";

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

export default function EditCompanyProfile({ open, handleClose }) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    errors: errorsPassword,
  } = useForm();
  const { request } = useHttp();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [editForm, setEditForm] = useState({});

  const onSubmit = async (data) => {
    try {
      const dataReq = await request("/api/company/edit-profile", "PUT", {
        ...data,
        _id: currentUser._id,
        operationType: "profile",
      });

      dispatch(getCurrentUser({ ...dataReq }));
    } catch (e) {}
  };

  const onSubmitPassword = async (data) => {
    try {
      const dataReq = await request("/api/company/edit-profile", "POST", {
        ...data,
        _id: currentUser._id,
        operationType: "password",
      });
    } catch (e) {}
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Update Profile
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to the page for editing user information, be careful.
          </DialogContentText>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Company Name"
                  defaultValue={currentUser.name}
                  inputRef={register({ required: true })}
                  error={!!errors.name}
                />
                {errors.name && (
                  <span className={classes.error}>This field is required</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="priceList"
                  label="Company's percentage"
                  name="priceList"
                  autoComplete="priceList"
                  defaultValue={currentUser.priceList}
                  inputRef={register({ required: true })}
                  error={!!errors.priceList}
                />
                {errors.priceList && (
                  <span className={classes.error}>This field is required</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  defaultValue={currentUser.email}
                  inputRef={register({
                    required: "You must provide the email address!",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "You must provide a valid email address!",
                    },
                  })}
                  error={!!errors.email}
                />
                {errors.email && (
                  <span className={classes.error}>{errors.email.message}</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  defaultValue={currentUser.address}
                  inputRef={register({ required: true })}
                  error={!!errors.address}
                />
                {errors.address && (
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
                  defaultValue={currentUser.description}
                  inputRef={register({ required: true })}
                  error={!!errors.description}
                />
                {errors.description && (
                  <span className={classes.error}>This field is required</span>
                )}
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
          <form noValidate onSubmit={handleSubmitPassword(onSubmitPassword)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="oldPassword"
                  label="Old Password"
                  type="password"
                  id="oldPassword"
                  autoComplete="current-password"
                  inputRef={registerPassword({
                    required: "You must provide a password.",
                    minLength: {
                      value: 6,
                      message:
                        "Your password must be greater than 6 characters",
                    },
                  })}
                  error={!!errorsPassword.oldPassword}
                />
                {errorsPassword.oldPassword && (
                  <span className={classes.error}>
                    {errorsPassword.oldPassword.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputRef={registerPassword({
                    required: "You must provide a password.",
                    minLength: {
                      value: 6,
                      message:
                        "Your password must be greater than 6 characters",
                    },
                  })}
                  error={!!errorsPassword.password}
                />
                {errorsPassword.password && (
                  <span className={classes.error}>
                    {errorsPassword.password.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="current-password"
                  inputRef={registerPassword({
                    required: "You must provide a password.",
                    minLength: {
                      value: 6,
                      message:
                        "Your password must be greater than 6 characters",
                    },
                  })}
                  error={!!errorsPassword.confirmPassword}
                />
                {errorsPassword.confirmPassword && (
                  <span className={classes.error}>
                    {errorsPassword.confirmPassword.message}
                  </span>
                )}
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
