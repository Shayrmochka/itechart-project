import React, { useEffect } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { fetchOrders } from "../../redux/actions";
import { useDispatch } from "react-redux";

function OrderInfo({
  open,
  onClose,
  orderDialogInfo,
  request,
  currentUser,
  //fetchOrders,
}) {
  const dispatch = useDispatch();
  const setAnswer = async (order, answer) => {
    try {
      await request(
        "/api/order/update-set-answer",
        "POST",
        {
          ...order,
          answer,
        },
        { Authorization: `Bearer: ${currentUser.token}` }
      );

      //fetchOrders(currentUser.token);
      dispatch(fetchOrders(currentUser));
    } catch (e) {}
    onClose();
  };

  const deleteOrder = async (order) => {
    try {
      await request(
        "/api/order/delete-order",
        "POST",
        {
          _id: order._id,
        },
        { Authorization: `Bearer: ${currentUser.token}` }
      );
      fetchOrders(currentUser.token);
    } catch (e) {}
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
          {orderDialogInfo.owner === undefined &&
          orderDialogInfo.company === undefined ? (
            <p>Loading Info</p>
          ) : currentUser.type === "user" ? (
            <DialogContentText>
              <DialogContentText>
                Order to: {orderDialogInfo.company.name}
              </DialogContentText>
              <DialogContentText>
                Email: {orderDialogInfo.company.email}
              </DialogContentText>
            </DialogContentText>
          ) : (
            <DialogContentText>
              <DialogContentText>
                Order from: {orderDialogInfo.owner.firstName}{" "}
                {orderDialogInfo.owner.lastName}
              </DialogContentText>
              <DialogContentText>
                Email: {orderDialogInfo.owner.email}
              </DialogContentText>
            </DialogContentText>
          )}

          <DialogContentText>
            Date Cleaning:{" "}
            {new Date(orderDialogInfo.dateCleaning).toLocaleDateString()}
          </DialogContentText>
          <DialogContentText>
            Flat Description: {orderDialogInfo.flatDescription}
          </DialogContentText>
          <DialogContentText>
            Bathrooms/Small Rooms/Big Rooms: {orderDialogInfo.bathrooms}/
            {orderDialogInfo.smallRooms}/{orderDialogInfo.bigRooms}
          </DialogContentText>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DialogContentText>
              Time: {orderDialogInfo.time}min
            </DialogContentText>
            <DialogContentText>
              Price: {orderDialogInfo.price}$
            </DialogContentText>
          </div>
        </DialogContent>
        {currentUser.type === "user" ? (
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
}

export default OrderInfo;
