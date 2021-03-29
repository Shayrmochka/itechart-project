import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

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
  },
  cardMedia: {
    width: "70px",
    height: "70px",
    borderRadius: "100px",
    objectFit: "cover",
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

function CompanyFeedbacks({ feedbacks }) {
  const classes = useStyles();
  const [counter, setCounter] = useState(1);
  const [feedbacksSorted, setFeedbacksSorted] = useState([]);

  const handleLoadMore = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (feedbacks.length > 0) {
      const sorted = feedbacks
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, counter);

      setFeedbacksSorted(sorted);
    }
  }, [feedbacks, counter]);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {feedbacksSorted.map((feedback, i) => (
          <Grid
            item
            key={i}
            xs={12}
            sm={6}
            md={4}
            style={{ maxWidth: "50%", flexBasis: "50%", minHeight: "140px" }}
          >
            <Card className={classes.card}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <img className={classes.cardMedia} src={feedback.ownerLogo} />
              </div>
              <CardContent className={classes.cardContent}>
                <Rating
                  name="read-only"
                  value={+feedback.rating}
                  readOnly
                  size="small"
                />
                <Typography
                  //gutterBottom
                  //variant="h5"
                  style={{ fontSize: "1.2rem", fontWeight: "500" }}
                  component="h2"
                >
                  {feedback.ownerFirstName} {feedback.ownerLastName}
                </Typography>
                <Typography>{feedback.text}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        {feedbacksSorted.length && feedbacks.length > counter ? (
          <Button onClick={handleLoadMore} variant="outlined" color="primary">
            Load more
          </Button>
        ) : (
          <Button disabled variant="outlined" color="primary">
            There are no feedbacks
          </Button>
        )}
      </Grid>
    </Container>
  );
}

export default CompanyFeedbacks;
