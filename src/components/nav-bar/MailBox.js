import React, { useState } from "react";

import { blue } from "@material-ui/core/colors";
import { fade, makeStyles } from "@material-ui/core/styles";

import {
  Avatar,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "white",
    color: blue[600],
  },
}));

function MailBox({
  onClose,
  open,
  ordersSortedByAccepted,
  handleClickOpenOrderDialog,
  orders,
  currentUser,
}) {
  const classes = useStyles();

  const [checkedOrders, setCheckedOrders] = useState(true);

  const handleChange = (event) => {
    setCheckedOrders(event.target.checked);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const returnOrders = (propsOrders) => {
    return (
      <List>
        {propsOrders.map((order) => (
          <ListItem
            button
            onClick={() => handleClickOpenOrderDialog(order)}
            key={order._id}
            style={{
              borderTop: "1px solid #00000020",
            }}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {currentUser.type === "user" ? (
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src={order.company.logo}
                  />
                ) : (
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src={order.owner.logo}
                  />
                )}
              </Avatar>
            </ListItemAvatar>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div>
                {currentUser.type === "user" ? (
                  <ListItemText
                    style={{ margin: "0" }}
                    primary={order.company.name}
                  />
                ) : (
                  <ListItemText
                    style={{ margin: "0" }}
                    primary={`${order.owner.firstName} ${order.owner.lastName}`}
                  />
                )}
                <ListItemText
                  style={{ margin: "0", color: "rgb(169, 169, 169)" }}
                  primary={order.serviceName}
                />
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle id="simple-dialog-title">Orders</DialogTitle>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedOrders}
              onChange={handleChange}
              name="checked"
              color="primary"
            />
          }
          label="Sort by accepted"
        />
      </div>

      {!checkedOrders
        ? returnOrders(orders)
        : returnOrders(ordersSortedByAccepted)}
    </Dialog>
  );
}

export default MailBox;
