import React, { useCallback, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer';
import Feedback from './Feedback';
import useHttp from '../../hooks/http.hook';
import CompanyFeedbacks from './CompanyFeedbacks';
import BarChart from '../graphs/BarChart';
import { getChosenCompany } from '../../redux/actions';
import useMessage from '../../hooks/message.hook';

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
    paddingBottom: theme.spacing(0),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  logoImgBlock: {
    textAlign: 'center',
    borderRadius: '100px',
    marginBottom: '40px',
  },
  logoImg: {
    width: '140px',
    borderRadius: '100px',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function CompanyCard({ company }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const currentUserType = useSelector((state) => state.user.currentUser.type);
  const history = useHistory();
  const { request } = useHttp();
  const message = useMessage();
  const [feedbacks, setFeedbacks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrder = () => {
    dispatch(getChosenCompany(company));
    history.push('/create-order');
  };

  const getFeedbacks = useCallback(async () => {
    try {
      const data = await request('/api/feedback/', 'GET', null, {
        company: company._id,
      });

      setFeedbacks(data);
    } catch (e) { message(e); }
  }, [company._id, message, request]);

  useEffect(() => {
    getFeedbacks();
  }, [getFeedbacks]);

  return (
    <>
      <CssBaseline />

      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.logoImgBlock}>
              <img className={classes.logoImg} src={company.logo} alt="company-logo" />
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
                  {isAuthenticated && currentUserType === 'user' ? (
                    <Button
                      onClick={handleOrder}
                      variant="contained"
                      color="primary"
                    >
                      Contact Us
                    </Button>
                  ) : (
                    <Button
                      onClick={() => history.push('/signin')}
                      variant="contained"
                      color="primary"
                      disabled={(isAuthenticated && currentUserType !== 'user')}
                    >
                      Login as User to contact us
                    </Button>
                  )}
                </Grid>
                <Grid item>
                  {isAuthenticated && currentUserType === 'user' ? (
                    <Button
                      onClick={handleClickOpen}
                      variant="outlined"
                      color="primary"
                    >
                      Rate Us
                    </Button>
                  ) : (
                    <Button
                      onClick={() => history.push('/signin')}
                      variant="outlined"
                      color="primary"
                      disabled={(isAuthenticated && currentUserType !== 'user')}
                    >
                      Login as User to Rate Us
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {company.typeOfServices.map((service) => (
              <Grid item key={service._id} xs={12} sm={6} md={4}>
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

        <BarChart companyId={company._id} feedbacks={feedbacks} />

        <CompanyFeedbacks feedbacks={feedbacks} />
      </main>

      <Footer />

      <Feedback open={open} handleClose={handleClose} companyId={company._id} />
    </>
  );
}

// CompanyCard.propTypes = {
//   company: PropTypes.shape().isRequired,
// };

export default CompanyCard;
