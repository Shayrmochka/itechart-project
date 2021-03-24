import React, { useContext, useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";

import { useForm } from "react-hook-form";
import { useHttp } from "../../../hooks/http.hook";
import { useMessage } from "../../../hooks/message.hook";
import { AuthContext } from "../../../context/AuthContext";
import CompaniesList from "../../companies/CompaniesList";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  error: {
    color: "red",
  },
  buttons: {
    width: "98%",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function AddressForm({ updateFinalForm }) {
  const from = "modal";
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const message = useMessage();
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();

  const [cleaningService, setCleaningService] = useState({
    services: 1,
  });
  const [addressForm, setAddressForm] = useState({});
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [chosenCompany, setChosenCompany] = useState({
    companyName: "Not Selected",
    companyId: "Not Selected",
  });

  const updateChosenCompany = (value) => {
    setChosenCompany({ companyName: value.name, companyId: value._id });
    handleClose();
  };

  const fetchCompanies = useCallback(async () => {
    try {
      const fetched = await request("/api/company", "GET", null, {
        Authorization: `Bearer: ${auth.token}`,
      });

      setCompanies(fetched);
      message(fetched.message);
    } catch (e) {}
  }, [auth.token, request]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const changeHandler = (event) => {
    //event.preventDefault();
    setAddressForm({
      ...addressForm,
      ...cleaningService,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setCleaningService({ [event.target.name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateFinalForm = () => {
    const { email, logo } = JSON.parse(
      localStorage.getItem("userData")
    ).userData;
    updateFinalForm({
      ...addressForm,
      ...chosenCompany,
      email,
      logo,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Cleaning details
      </Typography>
      <form
        className={classes.form}
        noValidate
        // onSubmit={(e) => handleSubmit(signInHandler(e))}
        //onSubmit={(event) => changeHandler(event)}
      >
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
                value={cleaningService.services}
                onChange={handleChange}
              >
                <MenuItem value={1}>Basic House Cleaning</MenuItem>
                <MenuItem value={2}>Deep Cleaning/Spring Cleaning</MenuItem>
                <MenuItem value={3}>Laundry Services</MenuItem>
                <MenuItem value={4}>Green Cleaning</MenuItem>
                <MenuItem value={5}>Sanitization Services</MenuItem>
                <MenuItem value={6}>Ceiling and Wall Cleaning</MenuItem>
                <MenuItem value={7}>Blind Cleaning</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <TextField
              id="datetime-local"
              name="date"
              label="Choose Date"
              type="datetime-local"
              defaultValue="2021-01-01T10:30"
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
              value={chosenCompany.companyName}
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
            {/* <Button onClick={handleSubmit(onSubmit)} variant="contained"> */}
            <Button onClick={handleClickOpen} variant="contained">
              Check other offers
            </Button>
          </Grid>

          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(handleUpdateFinalForm)}
              //type="submit"
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </Grid>

        {/* DIALOG FORM */}
        <Dialog
          fullWidth
          //maxWidth="md"
          maxWidth={false}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Choose Cleaning Company"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              A list of companies based on the selected parameters.
            </DialogContentText>
            {!loading && (
              <CompaniesList
                companies={companies}
                from={from}
                updateChosenCompany={updateChosenCompany}
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
    </React.Fragment>
  );
}

export default AddressForm;