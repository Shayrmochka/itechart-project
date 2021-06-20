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

const Checkout = () => {
  const classes = useStyles();
  const { request } = useHttp();
  const message = useMessage();
  const [activeStep, setActiveStep] = useState(0);
  const [finalForm, setFinalForm] = useState<any>({});

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  //   address: "qweqwe"
  // bathrooms: "1"
  // companyId: "60717e4a81de1d18ac55694f"
  // companyLogo: "https://cdn.iconscout.com/icon/free/png-256/apple-853-675472.png"
  // companyName: "Apple"
  // date: "2021-06-03T20:48"
  // flatDescription: "asdasd"
  // numberOfService: 1
  // priceList: "30"
  // room0: "10"
  // room1: "10"
  // room2: "120"
  // serviceDescription: "A service that involves general house cleaning jobs. You’ll attend to areas like the kitchen, lounge, bathroom, and bedroom."
  // serviceImage: "/images/services/1.jpg"
  // serviceName: "Basic House Cleaning"
  // servicePrice: 1
  // typeOfService: "basic"

  const updateFinalForm = (value: any) => {
    console.log('TEST', value);
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

  function getStepContent(step: number) {
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
};

export default Checkout;
