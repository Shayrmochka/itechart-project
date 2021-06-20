/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UsersList from '../../components/users/UsersList';
import Loader from '../../components/Loader';
import useHttp from '../../hooks/http.hook';
import AdminCompaniesList from '../../components/companies/AdminCompaniesList';
import useMessage from '../../hooks/message.hook';

interface TabPanelProps {

  children: any,
  value: number,
  index: number,
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    display: 'flex',
    maxWidth: '1280px',
    width: '100%',
    margin: '0 auto',
  },
  root: {
    backgroundColor: theme.palette.background.paper,

    maxWidth: '1280px',
    width: '100%',
    margin: '0 auto',
  },
  appBar: {
    marginTop: '64px',
    margin: '0 auto',
  },
  views: {
    marginTop: '40px',
  },
  tabs: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
  },
}));

const UsersPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const { loading, request } = useHttp();
  const message = useMessage();
  const [userBan, setUserBan] = useState(false);

  const handleUserBan = () => {
    setUserBan(true);
  };

  const handleUserBanClose = () => {
    setUserBan(false);
  };

  const fetchUsers = useCallback(async () => {
    try {
      const fetchedUsers = await request('/api/user', 'GET', null);
      setUsers(fetchedUsers);
      const fetchedCompanies = await request('/api/company', 'GET', null);
      setCompanies(fetchedCompanies);
    } catch (e) { message(e); }
  }, [message, request]);
  useEffect(() => {
    fetchUsers();
    return () => undefined;
  }, [fetchUsers]);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.rootWrapper}>
      <div className={classes.root}>
        <AppBar color="default" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
          >
            <Tab label="Users" {...{ id: `full-width-tab-${0}`, 'aria-controls': `full-width-tabpanel-${0}` }} />
            <Tab label="Companies" {...{ id: `full-width-tab-${1}`, 'aria-controls': `full-width-tabpanel-${1}` }} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.views}
        >
          <TabPanel value={value} index={0}>
            {!loading && (
              <UsersList
                users={users}
                open={userBan}
                handleClickOpen={handleUserBan}
                handleClose={handleUserBanClose}
              />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {!loading && (
              <AdminCompaniesList
                companies={companies}
                open={userBan}
                handleClickOpen={handleUserBan}
                handleClose={handleUserBanClose}
              />
            )}
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default UsersPage;
