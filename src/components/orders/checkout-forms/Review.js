import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function Review({ finalForm, handlePlaceOrder }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Chosen Company" />
          <Typography variant="subtitle1" className={classes.total}>
            {finalForm.companyName}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Chosen service" />
          <Typography variant="subtitle1" className={classes.total}>
            {finalForm.services}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Flat/House description" />
          <Typography variant="subtitle1" className={classes.total}>
            {finalForm.flatDescription}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Date" />
          <Typography variant="subtitle1" className={classes.total}>
            {finalForm.date}
          </Typography>
        </ListItem>
      </List>
      <Grid container>
        <Typography variant="h6" gutterBottom className={classes.title}>
          Address
        </Typography>

        <Grid item xs={12}>
          <Typography gutterBottom>{finalForm.address}</Typography>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          //type="submit"
          className={classes.button}
        >
          Place Order
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Review;