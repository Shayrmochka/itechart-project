import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import UsersList from "../../components/users/UsersList";
import { useMessage } from "../../hooks/message.hook";

import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AdminCompaniesList from "../../components/companies/AdminCompaniesList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    //width: 500,
  },
}));

function UsersPage() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
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
      const fetchedUsers = await request("/api/user", "GET", null);
      setUsers(fetchedUsers);
      message(fetchedUsers.message);
      const fetchedCompanies = await request("/api/company", "GET", null);
      setCompanies(fetchedCompanies);
      message(fetchedCompanies.message);
    } catch (e) {}
  }, [request]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            //variant="fullWidth"
            //maxWidth="lg"
            aria-label="full width tabs example"
          >
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="Companies" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {!loading && (
              <UsersList
                users={users}
                open={userBan}
                handleClickOpen={handleUserBan}
                handleClose={handleUserBanClose}
              />
            )}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
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
}

export default UsersPage;
