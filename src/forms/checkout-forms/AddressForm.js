import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  error: {
    color: "red",
  },
}));

function AddressForm() {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const [cleaningService, setCleaningService] = React.useState("");

  const handleChange = (event) => {
    setCleaningService(event.target.value);
  };

  const onSubmit = (data) => console.log(JSON.stringify(data));

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Cleaning details
      </Typography>
      <form
        className={classes.form}
        noValidate
        // onSubmit={(e) => handleSubmit(signInHandler(e))}
        onSubmit={handleSubmit(onSubmit)}
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
                labelId="select-cleaning-service-label"
                id="select-cleaning-service"
                value={cleaningService}
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
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="datetime-local"
              label="Choose Date"
              type="datetime-local"
              defaultValue="2021-01-01T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">Check other offers</Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default AddressForm;
