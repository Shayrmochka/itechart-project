import React, { useCallback, useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../Footer";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import Feedback from "./Feedback";
import { useHttp } from "../../hooks/http.hook";
import CompanyFeedbacks from "./CompanyFeedbacks";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  logoImgBlock: {
    textAlign: "center",
    borderRadius: "100px",
    marginBottom: "40px",
  },
  logoImg: {
    width: "140px",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const services = [
  {
    typeOfService: "Basic House Cleaning",
    serviceDescription:
      "A service that involves general house cleaning jobs. You’ll attend to areas like the kitchen, lounge, bathroom, and bedroom.",
    numberOfService: 1,
    serviceImage:
      "https://sun9-68.userapi.com/F16kmo0YvopQboy_wrViyiK--HzubXEiHMjgWg/VlzqwRVJ55k.jpg",
  },
  {
    typeOfService: "Deep Cleaning/Spring Cleaning",
    serviceDescription:
      "This is a more comprehensive clean than a basic clean. It will include hand washing cabinets, vacuuming upholstery, polishing wood, cleaning the oven, ceiling fan blades and more.",
    numberOfService: 2,
    serviceImage:
      "https://www.sweetestheartofmary.org/wp-content/uploads/2020/05/top-10-maid-agencies-kl-selangor-300x200.jpeg",
  },
  {
    typeOfService: "Laundry Services",
    serviceDescription:
      "A superb add on to offer homeowners where you wash, dry, and fold clothes while cleaning their house.",
    numberOfService: 3,
    serviceImage:
      "https://rus-uborka.ru/wp-content/uploads/2019/06/Himchistka-kovrolina-v-ofise.jpg",
  },
  {
    typeOfService: "Green Cleaning",
    serviceDescription:
      "Green cleaning involves following eco-friendly cleaning practices such as using products that are non-toxic, biodegradable, and safe for you and the environment.",
    numberOfService: 4,
    serviceImage:
      "https://cdn1.pokupon.ua/uploaded/new_campaign_pictures/633632/data/preview475x230/Fotoram.io-_1_.jpg?1570094375",
  },
  {
    typeOfService: "Sanitization Services",
    serviceDescription:
      "The sanitizing of homes and office spaces is currently in high demand. Squeaky Clean House is one example of a cleaning business offering this type of service, tailored specifically to the COVID-19 pandemic.",
    numberOfService: 5,
    serviceImage: "https://re-port.ru/uploads/content/04072020.jpg",
  },
  {
    typeOfService: "Ceiling and Wall Cleaning",
    serviceDescription:
      "Ceiling and wall cleaning may be part of a general house cleaning or office cleaning service provided by some businesses, but it’s also a specialty service.",
    numberOfService: 6,
    serviceImage:
      "https://www.servicemaster-rcs.com/wp-content/uploads/2016/06/ServiceMaster-Commercial-Cleaning.jpg",
  },
  {
    typeOfService: "Blind Cleaning",
    serviceDescription:
      "Blinds in homes, whether aluminum or PVC Venetian blinds or wooden blinds, attract dust, so there is a real need for this specialty cleaning service. ",
    numberOfService: 7,
    serviceImage:
      "http://www.bowdoinhamfcu.com/wp-content/uploads/2017/06/domestic-cleaning-300x181.jpg",
  },
];

function CompanyCard({ company }) {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const history = useHistory();
  const { request } = useHttp();

  const [feedbacks, setFeedbacks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrder = () => {
    history.push("/create-order");
  };

  const getFeedbacks = useCallback(async () => {
    try {
      const data = await request("/api/feedback/", "GET", null, {
        company: company._id,
      });
      //message(data.message);
      setFeedbacks(data);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    getFeedbacks();
  }, [getFeedbacks]);

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.logoImgBlock}>
              <img className={classes.logoImg} src={company.logo} />
            </div>

            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {company.name}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              {company.description}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    onClick={handleOrder}
                    variant="contained"
                    color="primary"
                  >
                    Contact Us
                  </Button>
                </Grid>
                <Grid item>
                  {isAuthenticated ? (
                    <Button
                      onClick={handleClickOpen}
                      variant="outlined"
                      color="primary"
                    >
                      Rate Us
                    </Button>
                  ) : (
                    <Button
                      onClick={() => history.push("/signin")}
                      variant="outlined"
                      color="primary"
                    >
                      Login to Rate Us
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {company.typeOfServices.map((service, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={service.serviceImage}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {service.serviceName}
                    </Typography>
                    <Typography>{service.serviceDescription}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <CompanyFeedbacks feedbacks={feedbacks} />
      </main>

      <Footer />

      <Feedback open={open} handleClose={handleClose} companyId={company._id} />
    </React.Fragment>
  );
}

export default CompanyCard;
