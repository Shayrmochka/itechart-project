import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import EditProfile from "../../components/profile/EditProfile";
import DeleteProfile from "../../components/profile/DeleteProfile";
import EditCompanyProfile from "../../components/profile/EditCompanyProfile";

const useStyles = makeStyles((theme) => ({
  heroContent: {
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

function UserProfile({ logout }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const handleEditProfile = () => {
    setEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setEditProfileOpen(false);
  };

  const [editCompany, setEditCompany] = useState(false);

  const handleEditCompany = () => {
    setEditCompany(true);
  };

  const handleEditCompanyClose = () => {
    setEditCompany(false);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
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
            Phone:
            {currentUser.type === "user" ? currentUser.phone : " * * * * * * *"}
          </Typography>
          <Typography align="center" color="textSecondary" paragraph>
            id: @{currentUser._id}
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                {currentUser.type === "user" ? (
                  <Button
                    onClick={handleEditProfile}
                    variant="contained"
                    color="primary"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    onClick={handleEditCompany}
                    variant="contained"
                    color="primary"
                  >
                    Edit Profile
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button
                  onClick={handleDeleteOpen}
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
      <Footer />
      <EditProfile
        open={editProfileOpen}
        handleClose={handleEditProfileClose}
      />
      <EditCompanyProfile
        open={editCompany}
        handleClose={handleEditCompanyClose}
      />
      <DeleteProfile
        open={deleteOpen}
        handleClose={handleDeleteClose}
        logout={logout}
      />
    </React.Fragment>
  );
}

export default UserProfile;
