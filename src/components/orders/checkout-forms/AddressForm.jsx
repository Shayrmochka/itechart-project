import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useHttp from '../../../hooks/http.hook';
import CompaniesList from '../../companies/CompaniesList';
import useMessage from '../../../hooks/message.hook';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  error: {
    color: 'red',
  },
  buttons: {
    width: '98%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

}));

function AddressForm({ updateFinalForm }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const currentUserType = useSelector((state) => state.user.currentUser.type);
  const dispatchedCompany = useSelector((state) => state.company.chosenCompany);

  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const history = useHistory();
  const { loading, request } = useHttp();
  const message = useMessage();

  const [cleaningService, setCleaningService] = useState({});
  const [addressForm, setAddressForm] = useState({
    date: new Date().toISOString().slice(0, 16),
  });
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [services, setServices] = useState([]);
  const [searchCompanies, setSearchCompanies] = useState(null);
  const [flatCounter, setFlatCounter] = useState([1]);

  const getSearchData = (value) => {
    setSearchCompanies(
      companies.filter((company) => `${company.name} ${company.address}`
        .toLowerCase()
        .includes(value.toLowerCase())),
    );
  };

  const changeHandler = (event) => {
    setAddressForm({
      ...addressForm,
      ...cleaningService,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setCleaningService(event.target.value);
    setSearchCompanies(
      companies.filter((el) => el.typeOfServices.includes(event.target.value._id)),
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateFinalForm = () => {
    updateFinalForm({
      ...addressForm,
      // ...chosenCompany,
      companyName: dispatchedCompany.name,
      companyId: dispatchedCompany._id,
      companyLogo: dispatchedCompany.logo,
      priceList: dispatchedCompany.priceList,
    });
  };

  // const updateChosenCompany = () => {
  //   setChosenCompany({
  //     companyName: dispatchedCompany.name,
  //     companyId: dispatchedCompany._id,
  //     companyLogo: dispatchedCompany.logo,
  //     priceList: dispatchedCompany.priceList,
  //   });
  //   handleClose();
  // };
  // console.log('test #2');
  // const fetchCompanies = useCallback(async () => {
  //   try {
  //     const fetchedCompanies = await request('/api/company', 'GET', null);

  //     setCompanies(fetchedCompanies);
  //   } catch (e) { message(e); }
  // }, [message, request]);

  // useEffect(() => {
  //   fetchCompanies();
  //   console.log('test #Comp');
  // }, [fetchCompanies]);

  // useEffect(() => {
  //   updateChosenCompany();
  //   console.log('test #Chosen');
  // }, [dispatchedCompany]);

  const fetchData = useCallback(async () => {
    try {
      const fetchedCompanies = await request('/api/company', 'GET', null);

      setCompanies(fetchedCompanies);
      const fetchedServices = await request('/api/service', 'GET', null);

      setServices(fetchedServices);
      setCleaningService(fetchedServices[0]);
    } catch (e) { message(e); }
  }, [message, request]);

  useEffect(() => {
    // fetchCompanies();
    fetchData();
    // console.log('test #Serv');
  }, [fetchData]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Cleaning details
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="shipping address-line"
              onChange={changeHandler}
              inputRef={register({
                required: true,
              })}
              error={!!errors.address}
            />
            {errors.address && (
              <span className={classes.error}>This field is required</span>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-cleaning-service-label">
                Cleaning Service
              </InputLabel>
              <Select
                name="services"
                labelId="select-cleaning-service-label"
                id="select-cleaning-service"
                value={cleaningService}
                onChange={handleChange}
              >
                {services.map((e) => (
                  <MenuItem value={e} key={e._id}>
                    {e.serviceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="flatDescription"
              name="flatDescription"
              label="Flat/House description"
              fullWidth
              onChange={changeHandler}
              inputRef={register({ required: true })}
              error={!!errors.flatDescription}
            />
            {errors.flatDescription && (
              <span className={classes.error}>This field is required</span>
            )}
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="bathrooms"
              label="Bathrooms"
              name="bathrooms"
              onChange={changeHandler}
              inputRef={register({
                required: 'You must enter number of bathrooms!',
                pattern: {
                  value: /^[0-9\b]+$/,
                  message: 'You must enter a number!',
                },
              })}
              error={!!errors.bathrooms}
            />
            {errors.bathrooms && (
              <span className={classes.error}>{errors.bathrooms.message}</span>
            )}
          </Grid>

          {flatCounter.map((e, i) => {
            const roomId = `room${i}`;

            return (
              <Grid item xs={12} sm={4} key={roomId}>
                <TextField
                  required
                  fullWidth
                  id={roomId}
                  label={`Room ${i + 1}`}
                  name={roomId}
                  onChange={changeHandler}
                  inputRef={register({
                    required: 'You must enter the area of the room!',
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: 'All your rooms must be an area!',
                    },
                  })}
                  error={!!errors.roomId}
                />
                {errors.roomId && (
                  <span className={classes.error}>{errors.roomId.message}</span>
                )}
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Button
              onClick={() => setFlatCounter([...flatCounter, flatCounter.push(1)])}
              variant="contained"
            >
              Add room
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="datetime-local"
              name="date"
              label="Choose Date"
              type="datetime-local"
              defaultValue={addressForm.date}
              onChange={changeHandler}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="company"
              name="company"
              value={dispatchedCompany.name}
              label="Company"
              fullWidth
              disabled
              onChange={changeHandler}
              inputRef={register({ required: true })}
              error={!!errors.firstName}
            />
            {errors.firstName && (
              <span className={classes.error}>This field is required</span>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleClickOpen} variant="contained">
              Check other offers
            </Button>
          </Grid>

          <div className={classes.buttons}>
            {isAuthenticated && currentUserType === 'user' ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(handleUpdateFinalForm)}
                className={classes.button}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push('/signin');
                }}
                className={classes.button}
                disabled={(isAuthenticated && currentUserType !== 'user')}
              >
                Please login as User
              </Button>
            )}
          </div>
        </Grid>

        <Dialog
          fullWidth
          maxWidth={false}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Choose Cleaning Company
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              A list of companies based on the selected parameters.
            </DialogContentText>
            {!loading && (
              <CompaniesList
                companies={
                  searchCompanies === null ? companies : searchCompanies
                }
                getSearchData={getSearchData}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
}
AddressForm.propTypes = {
  updateFinalForm: PropTypes.func.isRequired,
};

export default AddressForm;
