import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const cleaningDetails = {
  address: "69 rue des lieutemants Thomazo",
  service: "Green Cleaning",
  flatDescription: "House, 2 rooms, 3 sofa",
  date: "01.01.2021 10:30",
};

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
}));

function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Chosen service" />
          <Typography variant="subtitle1" className={classes.total}>
            {cleaningDetails.service}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Flat/House description" />
          <Typography variant="subtitle1" className={classes.total}>
            {cleaningDetails.flatDescription}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Date" />
          <Typography variant="subtitle1" className={classes.total}>
            {cleaningDetails.date}
          </Typography>
        </ListItem>
      </List>
      <Grid container>
        <Typography variant="h6" gutterBottom className={classes.title}>
          Address
        </Typography>

        <Grid item xs={12}>
          <Typography gutterBottom>{cleaningDetails.address}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Review;
