import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import useHttp from '../../hooks/http.hook';
import BanModal from '../BanModal';
import { IUser } from '../../interfaces/models.interfaces';
import { RootState } from '../../redux/rootReducer';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  card: {
    minWidth: 200,
    maxWidth: 220,
    minHeight: 240,
    margin: 10,
    cursor: 'pointer',
    transition: '0.5s',
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.2)',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  cardBanned: {
    minWidth: 200,
    maxWidth: 220,
    minHeight: 240,
    margin: 10,
    cursor: 'pointer',
    transition: '0.5s',
    boxShadow: '0 3px 6px 0 rgb(255 0 0 / 84%)',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 4,
  },
  link: {
    textDecoration: 'none',
    textTransform: 'none',
  },
  cardContent: { textAlign: 'center', paddingBottom: '0px' },
  cardBody: { textAlign: 'center' },
  cardImage: {
    width: '100px',
    height: 'auto',
    borderRadius: '100px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
});

interface UsersListProps {
  users: IUser[],
  open: boolean,
  handleClickOpen: () => void,
  handleClose: () => void,
}

const UsersList: React.FC<UsersListProps> = ({
  users, open, handleClickOpen, handleClose,
}) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const classes = useStyles();

  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>({
    _id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    logo: '',
    phone: '',
    isActive: true,
    banReason: '',
    type: '',
    role: '',
  });

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  const { request } = useHttp();
  const blockHandler = async (user: IUser, reason: string) => {
    if (currentUser._id !== user._id) {
      try {
        const response: IUser = await request('/api/user/update', 'PUT', {
          ...user,
          banReason: reason,
        });
        setAllUsers(
          allUsers.map((e) => (e._id !== response._id ? e : response)),
        );
      } catch (e) {
        throw new Error(e);
      }
    } else {
      alert('You can not block your account');
    }
  };

  if (!allUsers.length) {
    return <div>No Users!</div>;
  }
  return (
    <div className={classes.root}>
      {allUsers.map((user) => (
        <Card
          className={user.isActive ? classes.card : classes.cardBanned}
          key={user._id}

        >
          <CardContent className={classes.cardContent}>
            <div className={classes.cardBody}>
              <img
                className={classes.cardImage}
                src={user.logo}
                alt="user-logo"
              />
            </div>

            <Typography variant="h6" component="h2">
              {user.firstName}
              {' '}
              {user.lastName}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {user.role === 'Admin' ? 'Admin' : 'User'}
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              {user.email}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {user.isActive ? user.phone : `Blocked: ${user.banReason}`}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            {user.isActive ? (
              <Button
                size="small"
                onClick={() => {
                  setSelectedUser(user);
                  handleClickOpen();
                }}
              >
                Block
              </Button>
            ) : (
              <Button size="small" onClick={() => blockHandler(user, 'unbanned')}>
                Unblock
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
      <BanModal
        open={open}
        handleClose={handleClose}
        blockHandler={blockHandler}
        selectedCard={selectedUser}
      />
    </div>
  );
};

export default UsersList;
