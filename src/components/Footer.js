import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Link, Typography } from "@material-ui/core";
import CookiePreferences from "./cookie-preferences/CookiePreferences";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Shayrmochka">
        iTechArt
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },

  link: {
    margin: theme.spacing(1, 1.5),
  },

  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const footers = [
  {
    title: "Company",
    description: ["History", "Contact us", "Locations"],
    link: ["History", "/contactus", "Locations"],
  },
  {
    title: "Features",
    description: ["Cool stuff", "Random feature", "Another one"],
    link: ["Cool stuff", "Random feature", "Another one"],
  },
  {
    title: "Resources",
    description: ["Resource", "Another resource", "Final resource"],
    link: ["Resource", "Another resource", "Final resource"],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
    link: ["Privacy policy", "Terms of use"],
  },
];

export default function Footer() {
  const classes = useStyles();

  const [modalStatus, setModalStatus] = useState({
    closed: true,
  });

  useEffect(() => {
    setModalStatus({ closed: true });
    // effect;
    // return () => {
    //   cleanup;
    // };
  }, []);

  const openCookiePreferences = () => {
    setModalStatus({ closed: false });
  };

  const closeCookiePreferences = () => {
    setModalStatus({ closed: true });
  };

  const returnCookiePreferences = () => {
    console.log("return");

    if (!modalStatus.closed) {
      return (
        <CookiePreferences
          modalStatus={modalStatus}
          closeCookiePreferences={closeCookiePreferences}
        />
      );
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth="lg" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item, i) => (
                  <li key={item}>
                    <NavLink
                      style={{
                        textDecoration: "none",
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                      to={footer.link[i]}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
          <div
            style={{ width: "100%", textAlign: "left", paddingLeft: "16px" }}
          >
            <button
              style={{
                color: "rgba(0, 0, 0, 0.54)",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                padding: "0",
                fontSize: "1rem",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: "400",
                lineHeight: "1.75",
                letterSpacing: "0.00938em",
                cursor: "pointer",
              }}
              onClick={() => openCookiePreferences()}
            >
              Cookie Preferences
            </button>
            {!modalStatus.closed ? returnCookiePreferences() : <div></div>}
          </div>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
