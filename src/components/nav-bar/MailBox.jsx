import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

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
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: 'white',
    color: blue[600],
  },
  listItem: {
    borderTop: '1px solid #00000020',
  },
  listItemAvatar: {
    width: '100%',
    objectFit: 'cover',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  listItemText: { margin: '0' },
  itemTextEmpty: {
    margin: '0',
    color: 'rgb(169, 169, 169)',
  },
  dialogBody: {
    display: 'flex',
    justifyContent: 'space-between',
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

  const returnOrders = (propsOrders) => (
    <List>
      {propsOrders.map((order) => (
        <ListItem
          button
          onClick={() => handleClickOpenOrderDialog(order)}
          key={order._id}
          className={classes.listItem}

        >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              {currentUser.type === 'user' ? (
                <img
                  className={classes.listItemAvatar}
                  src={order.company.logo}
                  alt="company-logo"
                />
              ) : (
                <img
                  className={classes.listItemAvatar}
                  src={order.owner.logo}
                  alt="user-logo"
                />
              )}
            </Avatar>
          </ListItemAvatar>

          <div
            className={classes.textContainer}
          >
            <div>
              {currentUser.type === 'user' ? (
                <ListItemText
                  className={classes.listItemText}
                  primary={order.company.name}
                />
              ) : (
                <ListItemText
                  className={classes.listItemText}
                  primary={`${order.owner.firstName} ${order.owner.lastName}`}
                />
              )}
              <ListItemText
                className={classes.itemTextEmpty}
                primary={order.serviceName}
              />
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className={classes.dialogBody}>
        <DialogTitle id="simple-dialog-title">Orders</DialogTitle>
        <FormControlLabel
          control={(
            <Checkbox
              checked={checkedOrders}
              onChange={handleChange}
              name="checked"
              color="primary"
            />
          )}
          label="Sort by accepted"
        />
      </div>

      {!checkedOrders
        ? returnOrders(orders)
        : returnOrders(ordersSortedByAccepted)}
    </Dialog>
  );
}

MailBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  ordersSortedByAccepted: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickOpenOrderDialog: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.shape().isRequired,
};

export default MailBox;
