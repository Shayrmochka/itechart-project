import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Paper, Container, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  centerBlock: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'url(../images/center.jpg)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  centerBlockContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  paperImage: { display: 'none' },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

function CenterBlock(props) {
  const classes = useStyles();
  const { post } = props;

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
        <Paper
          className={classes.centerBlock}
        >
          <img
            className={classes.paperImage}
            src={post.image}
            alt={post.imageText}
          />
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.centerBlockContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {post.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {post.description}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>

  );
}

CenterBlock.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
  }).isRequired,
};

export default CenterBlock;
