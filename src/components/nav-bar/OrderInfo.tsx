/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { fetchOrders } from '../../redux/actions';
import useMessage from '../../hooks/message.hook';
import useHttp from '../../hooks/http.hook';
import { IOrder, IUser } from '../../interfaces/models.interfaces';

const useStyles = makeStyles(() => ({
  contentText: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface OrderInfoProps {
  open: boolean,
  onClose: () => void,
  orderDialogInfo: IOrder | any,
  currentUser: IUser | any,
}

const OrderInfo: React.FC<OrderInfoProps> = ({
  open,
  onClose,
  orderDialogInfo,
  currentUser,
}) => {
  const classes = useStyles();
  const message = useMessage();
  const dispatch = useDispatch();
  const { request } = useHttp();
  const setAnswer = async (order: IOrder, answer: boolean) => {
    try {
      await request(
        '/api/order/update-set-answer',
        'PUT',
        {
          ...order,
          answer,
        },
        { Authorization: `Bearer: ${currentUser.token}` },
      );
      dispatch(fetchOrders(currentUser, message));
    } catch (e) { message(e); }
    onClose();
  };

  const deleteOrder = async (order: IOrder) => {
    try {
      await request(
        '/api/order/delete-order',
        'DELETE',
        {
          _id: order._id,
        },
        { Authorization: `Bearer: ${currentUser.token}` },
      );
      fetchOrders(currentUser.token, message);
    } catch (e) { message(e); }
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {orderDialogInfo.serviceName}
        </DialogTitle>
        <DialogContent>
          {Object.entries(orderDialogInfo).length === 0 && orderDialogInfo.constructor === Object ? (
            <p>Loading Info</p>
          ) : currentUser.type === 'user' ? (
            <DialogContentText>
              <DialogContentText>
                Order to:
                {' '}
                {orderDialogInfo.company.name}
              </DialogContentText>
              <DialogContentText>
                Email:
                {' '}
                {orderDialogInfo.company.email}
              </DialogContentText>
            </DialogContentText>
          ) : (
            <DialogContentText>
              <DialogContentText>
                Order from:
                {' '}
                {orderDialogInfo.owner.firstName}
                {' '}
                {orderDialogInfo.owner.lastName}
              </DialogContentText>
              <DialogContentText>
                Email:
                {' '}
                {orderDialogInfo.owner.email}
              </DialogContentText>
            </DialogContentText>
          )}

          <DialogContentText>
            Date Cleaning:
            {' '}
            {new Date(orderDialogInfo.dateCleaning).toLocaleDateString()}
          </DialogContentText>
          <DialogContentText>
            Flat Description:
            {' '}
            {orderDialogInfo.flatDescription}
          </DialogContentText>
          <DialogContentText>
            Bathrooms/Small Rooms/Big Rooms:
            {' '}
            {orderDialogInfo.bathrooms}
            /
            {orderDialogInfo.smallRooms}
            /
            {orderDialogInfo.bigRooms}
          </DialogContentText>
          <div className={classes.contentText}>
            <DialogContentText>
              Time:
              {' '}
              {orderDialogInfo.time}
              min
            </DialogContentText>
            <DialogContentText>
              Price:
              {' '}
              {orderDialogInfo.price}
              $
            </DialogContentText>
          </div>
        </DialogContent>
        {currentUser.type === 'user' ? (
          <DialogActions>
            <Button
              onClick={() => deleteOrder(orderDialogInfo)}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button
              onClick={() => setAnswer(orderDialogInfo, true)}
              color="primary"
            >
              Accept
            </Button>
            <Button
              onClick={() => setAnswer(orderDialogInfo, false)}
              color="primary"
              autoFocus
            >
              Decline
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default OrderInfo;
