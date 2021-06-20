import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../hooks/http.hook';
import { hideLoader, showLoader } from '../../redux/actions';
import useMessage from '../../hooks/message.hook';
import { RootState } from '../../redux/rootReducer';

interface DeleteProfileProps {
  open: boolean,
  handleClose: () => void,
  logout: () => void,
}

const DeleteProfile: React.FC<DeleteProfileProps> = ({ open, handleClose, logout }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { request } = useHttp();
  const message = useMessage();
  const dispatch = useDispatch();
  const handleAgree = async () => {
    try {
      if (currentUser.type === 'user') {
        dispatch(showLoader());
        await request('/api/user/delete-profile', 'DELETE', {
          _id: currentUser._id,
        });
        handleClose();
        logout();
        dispatch(hideLoader());
      } else if (currentUser.type === 'company') {
        dispatch(showLoader());
        await request('/api/company/delete-profile', 'DELETE', {
          _id: currentUser._id,
        });
        handleClose();
        logout();
        dispatch(hideLoader());
      }
    } catch (e) {
      message(e);
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
};

export default DeleteProfile;
