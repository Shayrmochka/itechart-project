import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  TextareaAutosize,
  Typography,
} from '@material-ui/core';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import useHttp from '../../hooks/http.hook';
import useMessage from '../../hooks/message.hook';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textArea: {
    maxWidth: '100%',
    minWidth: '100%',
    boxSizing: 'border-box',
    minHeight: '5em',
    marginTop: '10px',
    padding: '14px 14px',
    borderRadius: '4px',
    borderColor: '#c0c0c0',
    '&:hover': {
      borderColor: 'rgb(59, 59, 59)',
    },
    '&:focus': {
      borderColor: '#4058b5',
    },
    color: '#878787',
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    letterSpacing: 'inherit',
  },
  clicked: {
    color: '#3f51b5',
  },
  notClicked: {
    color: '#989898',
  },
}));

function Feedback({ open, handleClose, companyId }) {
  const classes = useStyles();
  const { request } = useHttp();
  const message = useMessage();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState({
    feedbackText: '',
  });

  const changeHandler = (event) => {
    setFeedback({
      ...feedback,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateFeedback = async (finalForm) => {
    try {
      await request('/api/feedback/create-new-feedback', 'POST', {
        ...finalForm,
      });
    } catch (e) { message(e); }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateFeedback({
      rating: rating > 0 ? rating : 1,
      ...feedback,
      logo: currentUser.logo,
      _id: currentUser._id,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      companyId,
    });
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <Container component="main" maxWidth="sm">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <FeedbackOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Feedback
            </Typography>
            <form className={classes.form} noValidate>
              <Box display="flex" justifyContent="center" p={2}>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newRating) => {
                    setRating(newRating);
                  }}
                />
              </Box>

              <TextareaAutosize
                className={classes.textArea}
                rowsMax={4}
                aria-label="maximum height"
                placeholder="Write your feedback here."
                name="feedbackText"
                value={feedback.feedbackText}
                onChange={changeHandler}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => handleSubmit(e)}
              >
                Send
              </Button>
            </form>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}

Feedback.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
};

export default Feedback;
