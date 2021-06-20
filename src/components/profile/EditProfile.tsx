import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../hooks/http.hook';
import { getCurrentUser } from '../../redux/actions';
import useMessage from '../../hooks/message.hook';
import { RootState } from '../../redux/rootReducer';
import { IUser } from '../../interfaces/models.interfaces';
import { IUserInfo, IChangePassword } from '../../interfaces/updatingProfile.interfaces';

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
  dialogTitle: { textAlign: 'center' },
}));

interface EditProfileProps {
  open: boolean,
  handleClose: () => void,
}

const EditProfile: React.FC<EditProfileProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    errors: errorsPassword,
  } = useForm();
  const { request } = useHttp();
  const message = useMessage();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const onSubmit = async (data: IUserInfo) => {
    try {
      const dataReq: IUser = await request('/api/user/edit-profile', 'PUT', {
        ...data,
        _id: currentUser._id,
        operationType: 'profile',
      });

      dispatch(getCurrentUser({ ...dataReq }));
    } catch (e) { message(e); }
  };

  const onSubmitPassword = async (data: IChangePassword) => {
    try {
      await request('/api/user/edit-profile', 'POST', {
        ...data,
        _id: currentUser._id,
        operationType: 'password',
      });
    } catch (e) { message(e); }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
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
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  defaultValue={currentUser.firstName}
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
                  defaultValue={currentUser.lastName}
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
                  defaultValue={currentUser.email}
                  inputRef={register({
                    required: 'You must provide the email address!',
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'You must provide a valid email address!',
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
                  defaultValue={currentUser.phone}
                  inputRef={register({
                    required: 'You must provide the phone number!',
                    pattern: {
                      value:
                        /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/,
                      message: 'You must provide a valid phone number!',
                    },
                  })}
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <span className={classes.error}>{errors.phone.message}</span>
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
                    required: 'You must provide a password.',
                    minLength: {
                      value: 6,
                      message:
                        'Your password must be greater than 6 characters',
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
                    required: 'You must provide a password.',
                    minLength: {
                      value: 6,
                      message:
                        'Your password must be greater than 6 characters',
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
                    required: 'You must provide a password.',
                    minLength: {
                      value: 6,
                      message:
                        'Your password must be greater than 6 characters',
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
};

export default EditProfile;
