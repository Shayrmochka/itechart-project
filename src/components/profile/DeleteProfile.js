import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { hideLoader, showLoader } from "../../redux/actions";

export default function AlertDialog({ open, handleClose, logout }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { request } = useHttp();
  const dispatch = useDispatch();
  const handleAgree = async () => {
    try {
      dispatch(showLoader());
      await request("/api/user/delete-profile", "POST", {
        _id: currentUser._id,
      });
      handleClose();
      logout();
      dispatch(hideLoader());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete your profile?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting your account is permanent and will remove all content
            including comments, avatars and profile settings. Are you sure you
            want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
