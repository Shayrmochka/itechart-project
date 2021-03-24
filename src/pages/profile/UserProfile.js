import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  logoImgBlock: {
    textAlign: "center",
    borderRadius: "100px",
    marginBottom: "20px",
  },
  logoImg: {
    width: "180px",
    borderRadius: "200px",
  },
}));

function UserProfile() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userData")).userData);
  }, []);

  const handleEditProfile = () => {
    console.log("handleEditProfile");
  };

  const handleDeleteProfile = () => {
    console.log("handleDeleteProfile");
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <div className={classes.logoImgBlock}>
            <img className={classes.logoImg} src={currentUser.logo} />
          </div>

          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="textPrimary"
          >
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            {currentUser.role}
          </Typography>
          <Typography align="center" color="textSecondary" paragraph>
            Email: {currentUser.email}
          </Typography>
          <Typography align="center" color="textSecondary" paragraph>
            Phone: +{currentUser.phone}
          </Typography>
          <Typography align="center" color="textSecondary" paragraph>
            id: @{currentUser._id}
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  onClick={handleEditProfile}
                  variant="contained"
                  color="primary"
                >
                  Edit Profile
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleDeleteProfile}
                  variant="outlined"
                  color="primary"
                >
                  Delete Profile
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default UserProfile;
