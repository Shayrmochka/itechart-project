/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Container,
  Grid,
} from '@material-ui/core';
import FeaturedPost from './FeaturedPost';
import Footer from '../../components/Footer';
import CenterBlock from './CenterBlock';
import ImageCarousel from '../../components/ImageCarousel';
import PriceBlock from './PriceBlock';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
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
  featuredWrapper: { marginTop: '20px' },
}));

const centerPost = {
  title: 'Enrich the travelling experience',
  description:
    'A clean, safe airport keeps travellers healthy and happy, while spotless shopping and dining facilities play a crucial role in strengthening an airport’s reputation.',
  image: '../images/center.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Fuel productivity',
    company: 'ISS',
    description: 'A clean and hygienic workplace can help teams reach peak focus and ensure 100% uptime by reducing the risk of malfunctions, errors or accidents – and, crucially, decrease the number of sick days.',
    image: '../images/featured_1.jpg',
    imageText: 'Image Text',
  },
  {
    title: 'Help patients heal',
    company: 'ISS',
    description: 'Support patients and their families on their road to recovery with clean, safe hospital environments. With healthcare housekeeping and medical equipment cleaning.',
    image: '../images/featured_2.jpg',
    imageText: 'Image Text',
  },
];

const tiers = [
  {
    title: 'Laundry',
    price: '40+',
    description: 'A superb add on to offer homeowners where you wash, dry, and fold clothes while cleaning their house.',
    buttonText: 'Create Order',
    buttonVariant: 'outlined',
  },
  {
    title: 'Basic',
    subheader: 'Most popular',
    price: '25+',
    description: 'A service that involves general house cleaning jobs. You’ll attend to areas like the kitchen, lounge, bathroom, and bedroom. Tasks include mopping, vacuuming, dusting, polishing, sweeping.',
    buttonText: 'Create Order',
    buttonVariant: 'contained',
  },
  {
    title: 'Sanitization',
    price: '60+',
    description: 'The sanitizing of homes and office spaces is currently in high demand. Squeaky Clean House is one example of a cleaning business offering.',
    buttonText: 'Create Order',
    buttonVariant: 'outlined',
  },
];

export default function HomePage() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <ImageCarousel />

          <Grid container spacing={4} className={classes.featuredWrapper}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid} />
        </main>
      </Container>

      <CenterBlock post={centerPost} />

      <PriceBlock tiers={tiers} />
      <Footer />
    </>
  );
}
