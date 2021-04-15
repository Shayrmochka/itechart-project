import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import FeaturedPost from "./FeaturedPost";
import Footer from "../../components/Footer";
import CenterBlock from "./CenterBlock";
import ImageCarousel from "../../components/ImageCarousel";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

const centerPost = {
  title: "Enrich the travelling experience",
  description:
    "A clean, safe airport keeps travellers healthy and happy, while spotless shopping and dining facilities play a crucial role in strengthening an airport’s reputation.",
  image: "../images/center.jpg",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Fuel productivity",
    company: "ISS",
    description: `A clean and hygienic workplace can help teams reach peak focus and ensure 100% uptime by reducing the risk of malfunctions, errors or accidents – and, crucially, decrease the number of sick days.`,
    image: "../images/featured_1.jpg",
    imageText: "Image Text",
  },
  {
    title: "Help patients heal",
    company: "ISS",
    description: `Support patients and their families on their road to recovery with clean, safe hospital environments. With healthcare housekeeping and medical equipment cleaning.`,
    image: "../images/featured_2.jpg",
    imageText: "Image Text",
  },
];

const tiers = [
  {
    title: "Laundry",
    price: "40+",
    description: `A superb add on to offer homeowners where you wash, dry, and fold clothes while cleaning their house.`,
    buttonText: "Create Order",
    buttonVariant: "outlined",
  },
  {
    title: "Basic",
    subheader: "Most popular",
    price: "25+",
    description: `A service that involves general house cleaning jobs. You’ll attend to areas like the kitchen, lounge, bathroom, and bedroom. Tasks include mopping, vacuuming, dusting, polishing, sweeping.`,
    buttonText: "Create Order",
    buttonVariant: "contained",
  },
  {
    title: "Sanitization",
    price: "60+",
    description: `The sanitizing of homes and office spaces is currently in high demand. Squeaky Clean House is one example of a cleaning business offering.`,
    buttonText: "Create Order",
    buttonVariant: "outlined",
  },
];

export default function HomePage() {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const handleOpen = () => {
    if (user.isAuthenticated && user.currentUser.type === "user") {
      history.push("/create-order");
    } else history.push("/signin");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <ImageCarousel />

          <Grid container spacing={4} style={{ marginTop: "20px" }}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}></Grid>
        </main>
      </Container>

      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Cleaning places for the new normal
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          The world’s leading companies have turned to us for advice on cleaning
          and hygiene during the global pandemic. As a global organisation
          delivering services at the frontline, we have gathered many learnings
          and insights.
        </Typography>
      </Container>

      <Container maxWidth="lg">
        <CenterBlock post={centerPost} />
      </Container>

      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Precise cleaning that makes places shine
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Clean, hygienic places demand high standards. As the world leaders in
          cleaning and hygiene, we are dedicated to the health, safety and
          well-being of your people, guests and customers.
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                  </div>

                  <Typography variant="subtitle1" align="center">
                    {tier.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {user.isAuthenticated &&
                  user.currentUser.type === "company" ? (
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      color="primary"
                      disabled
                    >
                      Login as user
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      color="primary"
                      onClick={handleOpen}
                    >
                      {tier.buttonText}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
