import React from "react";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import { makeStyles } from "@material-ui/core/styles";

import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import MoodOutlinedIcon from "@material-ui/icons/MoodOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textArea: {
    maxWidth: "100%",
    minWidth: "100%",
    minHeight: "5em",
    padding: "14px 14px",
    borderRadius: "4px",
    borderColor: "#c0c0c0",
    "&:hover": {
      borderColor: "rgb(59, 59, 59)",
    },
    "&:focus": {
      borderColor: "#4058b5",
    },
    color: "#878787",
    fontSize: "1rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    letterSpacing: "inherit",
  },
}));

function Feedback() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FeedbackOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Feedback
        </Typography>
        <form className={classes.form} noValidate>
          <Box display="flex" justifyContent="center" p={2}>
            <ButtonGroup
              variant="text"
              color="primary"
              size="large"
              aria-label="contained primary button group"
            >
              <Button>
                <SentimentVeryDissatisfiedOutlinedIcon />
              </Button>
              <Button>
                <SentimentDissatisfiedOutlinedIcon />
              </Button>
              <Button>
                <SentimentSatisfiedOutlinedIcon />
              </Button>
              <Button>
                <MoodOutlinedIcon />
              </Button>
              <Button>
                <SentimentVerySatisfiedOutlinedIcon />
              </Button>
            </ButtonGroup>
          </Box>

          <TextareaAutosize
            className={classes.textArea}
            rowsMax={4}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue="Write your feedback here."
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Feedback;
