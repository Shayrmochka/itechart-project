import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IUser } from '../interfaces/models.interfaces';

interface BanModalProps {
  open: boolean,
  handleClose: () => void,
  blockHandler: (user: IUser, reason: string) => void,
  selectedCard: IUser,
}

const BanModal: React.FC<BanModalProps> = ({
  open,
  handleClose,
  blockHandler,
  selectedCard,
}) => {
  const [reason, setReason] = useState('');

  const handleChange = (event: any) => {
    setReason(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Block account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Be careful, all changes will be saved and recorded in the database,
            the account will no longer be able to be used. Please write the
            reason for blocking account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Block Reason"
            type="reason"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              blockHandler(selectedCard, reason);
              handleClose();
            }}
            color="primary"
          >
            Block
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BanModal;
