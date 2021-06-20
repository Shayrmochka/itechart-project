import React, { useState, useEffect, useCallback } from 'react';
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
import { RootState } from '../../../redux/rootReducer';
import { ICompany, IService } from '../../../interfaces/models.interfaces';

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

interface IAddressForm {
  // address: string,
  // flatDescription: string,
  // bathrooms: string,
  // date: string,
  // company: string,
  companyName: string,
  companyId: string,
  companyLogo: string,
  priceList: string,
}

interface AddressFormProps {
  updateFinalForm: (value: IAddressForm) => void
}

interface IDataState {
  companies:ICompany[],
  services: IService[]
}

const AddressForm: React.FC<AddressFormProps> = ({ updateFinalForm }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const currentUserType = useSelector((state: RootState) => state.user.currentUser.type);
  const dispatchedCompany = useSelector((state: RootState) => state.company.chosenCompany);

  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const history = useHistory();
  const {
    loading, request, error, clearError,
  } = useHttp();
  const message = useMessage();

  const [cleaningService, setCleaningService] = useState<IService | null>(null);
  const [addressForm, setAddressForm] = useState({
    date: new Date().toISOString().slice(0, 16),
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IDataState>({
    companies: [],
    services: [],
  });
  const [searchCompanies, setSearchCompanies] = useState<ICompany[] | null>(null);
  const [flatCounter, setFlatCounter] = useState([1]);

  const getSearchData = (value: string) => {
    const search: ICompany[] = data.companies.filter((company) => `${company.name} ${company.address}`
      .toLowerCase()
      .includes(value.toLowerCase()));
    setSearchCompanies(search);
  };

  const changeHandler = (event: { target: { name: any; value: any; }; }) => {
    setAddressForm({
      ...addressForm,
      ...cleaningService,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event: { target: { value: any; }; }) => {
    const targetService = data.services.filter((e) => e.typeOfService === event.target.value);
    setCleaningService(targetService[0]);
    setSearchCompanies(
      data.companies.filter((el) => el.typeOfServices.includes(targetService[0]._id)),
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
      companyName: dispatchedCompany.name,
      companyId: dispatchedCompany._id,
      companyLogo: dispatchedCompany.logo,
      priceList: dispatchedCompany.priceList,
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const fetchedCompanies: ICompany[] = await request('/api/company', 'GET', null);
      const fetchedServices: IService[] = await request('/api/service', 'GET', null);

      if (!fetchedCompanies || !fetchedServices) {
        throw new Error('Bad response from the server');
      }
      setData(
        {
          companies: fetchedCompanies,
          services: fetchedServices,
        },
      );
    } catch (e) {
      message(e);
      message(error);
      clearError();
    }
  }, [clearError, error, message, request]);

  useEffect(() => {
    fetchData();
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
                value={cleaningService?.serviceName}
                onChange={handleChange}
              >
                {data.services.map((e) => (
                  <MenuItem value={e.typeOfService} key={e._id}>
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
              value={dispatchedCompany.name || 'Company'}
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
                  searchCompanies === null ? data.companies : searchCompanies
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
};
// AddressForm.propTypes = {
//   updateFinalForm: PropTypes.func.isRequired,
// };

export default AddressForm;
