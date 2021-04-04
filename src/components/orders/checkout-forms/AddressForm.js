import React, { useState, useEffect, useCallback } from "react";
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
import CompaniesList from "../../companies/CompaniesList";
import { useSelector } from "react-redux";

const orderTest = {
  address: "qeqwewqe",
  bathrooms: "2",
  companyId: "6053d61534a7664eb3126452",
  companyLogo:
    "https://cdn.iconscout.com/icon/free/png-256/apple-853-675472.png",
  companyName: "Apple",
  date: "2021-01-20T10:30",
  email: "qwe@mail.ru",
  flatDescription: "qweqweqwe",
  logo:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/54a8a787-4619-4b1f-a0ca-03ffac31b0a6-profile_image-300x300.png",
  numberOfService: 4,
  room0: "20",
  room1: "50",
  room2: "120",
  room3: "10",
  serviceDescription:
    "Green cleaning involves following eco-friendly cleaning practices such as using products that are non-toxic, biodegradable, and safe for you and the environment.",
  serviceImage:
    "https://cdn1.pokupon.ua/uploaded/new_campaign_pictures/633632/data/preview475x230/Fotoram.io-_1_.jpg?1570094375",
  serviceName: "Green Cleaning",
  typeOfService: "green",
  __v: 0,
  _id: "6062eda05d2a85222572eb9c",
  servicePrice: "7",
  priceList: "9",
};

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

  const { loading, request } = useHttp();

  const [cleaningService, setCleaningService] = useState({});
  const [addressForm, setAddressForm] = useState({});
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [chosenCompany, setChosenCompany] = useState({
    companyName: "Not Selected",
    companyId: "Not Selected",
  });
  const [services, setServices] = useState([]);
  const [searchCompanies, setSearchCompanies] = useState(null);
  const [flatCounter, setFlatCounter] = useState([1]);
  const [flat, setFlat] = useState(null);

  const getSearchData = (value) => {
    setSearchCompanies(
      companies.filter((company) =>
        `${company.name} ${company.address}`
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  };

  const updateChosenCompany = (value) => {
    setChosenCompany({
      companyName: value.name,
      companyId: value._id,
      companyLogo: value.logo,
      priceList: value.priceList,
    });
    handleClose();
  };

  const fetchCompanies = useCallback(async () => {
    try {
      const fetched = await request("/api/company", "GET", null);

      setCompanies(fetched);
      message(fetched.message);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const fetchServices = useCallback(async () => {
    try {
      const fetched = await request("/api/service", "GET", null);

      // const data = fetched.map((e, i) =>
      //   i === 0 ? { ...e, checked: true } : { ...e, checked: false }
      // );

      setServices(fetched);
      setCleaningService(fetched[0]);
    } catch (e) {}
  }, [request]);
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const changeHandler = (event) => {
    //event.preventDefault();
    setAddressForm({
      ...addressForm,
      ...cleaningService,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setCleaningService(event.target.value);
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
      ...chosenCompany,
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
                required: "You must enter number of bathrooms!",
                pattern: {
                  value: /^[0-9\b]+$/,
                  message: "You must enter a number!",
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
              <Grid item xs={12} sm={4} key={i}>
                <TextField
                  required
                  fullWidth
                  id={roomId}
                  label={`Room ${i + 1}`}
                  name={roomId}
                  onChange={changeHandler}
                  inputRef={register({
                    required: "You must enter the area of the room!",
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "All your rooms must be an area!",
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
              onClick={() =>
                setFlatCounter([...flatCounter, flatCounter.push(1)])
              }
              variant="contained"
              style={{
                height: "30px",
                borderRadius: "100px",
              }}
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
                companies={
                  searchCompanies === null ? companies : searchCompanies
                }
                from={from}
                updateChosenCompany={updateChosenCompany}
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
    </React.Fragment>
  );
}

export default AddressForm;
