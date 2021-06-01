import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useHttp from '../../hooks/http.hook';
import BanModal from '../BanModal';
import useMessage from '../../hooks/message.hook';

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
  cardContent: {
    textAlign: 'center',
    paddingBottom: '0px',
  },
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

function AdminCompaniesList({
  companies, open, handleClickOpen, handleClose,
}) {
  const classes = useStyles();
  const message = useMessage();
  const [allCompanies, setAllCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});

  useEffect(() => {
    setAllCompanies(companies);
  }, [companies]);

  const { request } = useHttp();
  const blockHandler = async (company, reason) => {
    try {
      const response = await request('/api/company/update', 'PUT', {
        ...company,
        banReason: reason,
      });
      setAllCompanies(
        allCompanies.map((e) => (e._id !== response._id ? e : response)),
      );
    } catch (e) {
      message(e);
    }
  };

  if (!allCompanies.length) {
    return <div>No Companies!</div>;
  }
  return (
    <div className={classes.root}>
      {allCompanies.map((company) => (
        <Card
          className={company.isActive ? classes.card : classes.cardBanned}
          key={company._id}
        >
          <CardContent className={classes.cardContent}>
            <div className={classes.cardBody}>
              <img
                className={classes.cardImage}
                src={company.logo}
                alt="company-logo"
              />
            </div>

            <Typography variant="h6" component="h2">
              {company.name}
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              {company.email}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Price:
              {' '}
              {company.priceList}
              $
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {company.isActive
                ? `Rating: ${company.rating}`
                : `Blocked: ${company.banReason}`}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            {company.isActive ? (
              <Button
                size="small"
                onClick={() => {
                  setSelectedCompany(company);
                  handleClickOpen();
                }}
              >
                Block
              </Button>
            ) : (
              <Button size="small" onClick={() => blockHandler(company)}>
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
        selectedCard={selectedCompany}
      />
    </div>
  );
}

AdminCompaniesList.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AdminCompaniesList;
