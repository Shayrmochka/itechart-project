import React, { useState } from 'react';
import {
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import AddressForm from './AddressForm';
import Review from './Review';
import useHttp from '../../../hooks/http.hook';
import getPrice from '../../../utils/getPrice';
import useMessage from '../../../hooks/message.hook';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 10, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Address', 'Review your order'];

function Checkout() {
  const classes = useStyles();
  const { request } = useHttp();
  const message = useMessage();
  const [activeStep, setActiveStep] = useState(0);
  const [finalForm, setFinalForm] = useState({});

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const updateFinalForm = (value) => {
    const moneyDetail = getPrice(value);
    setFinalForm({ ...value, ...moneyDetail });
    handleNext();
  };

  const handlePlaceOrder = async () => {
    try {
      await request(
        '/api/order/create-new-order',
        'POST',
        finalForm,
      );
    } catch (e) { message(e); }
    handleNext();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm updateFinalForm={updateFinalForm} />;
      case 1:
        return (
          <Review finalForm={finalForm} handlePlaceOrder={handlePlaceOrder} />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
}

export default Checkout;
