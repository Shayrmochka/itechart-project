import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

interface ITiers {
  title: string,
  subheader?: string;
  price: string,
  description: string,
  buttonText: string,
  buttonVariant: string,
}

interface PriceBlockProps {
  tiers: Array<ITiers>
}

const PriceBlock: React.FC<PriceBlockProps> = ({ tiers }) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state: RootState) => state.user);

  const handleOpen = () => {
    if (user.isAuthenticated && user.currentUser.type === 'user') {
      history.push('/create-order');
    } else history.push('/signin');
  };

  return (
    <>
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
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      $
                      {tier.price}
                    </Typography>
                  </div>

                  <Typography variant="subtitle1" align="center">
                    {tier.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {user.isAuthenticated
                    && user.currentUser.type === 'company' ? (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled
                      >
                        Login as user
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
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
    </>
  );
};

// PriceBlock.propTypes = {
//   tiers: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       price: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       buttonText: PropTypes.string.isRequired,
//       buttonVariant: PropTypes.string.isRequired,
//     }).isRequired,
//   ).isRequired,
// };

export default PriceBlock;
