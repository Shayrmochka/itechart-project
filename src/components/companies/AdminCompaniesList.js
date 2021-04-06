import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useHttp } from "../../hooks/http.hook";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  card: {
    minWidth: 200,
    maxWidth: 220,
    minHeight: 240,
    margin: 10,
    cursor: "pointer",
    transition: "0.5s",
    boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.2)",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  cardBanned: {
    minWidth: 200,
    maxWidth: 220,
    minHeight: 240,
    margin: 10,
    cursor: "pointer",
    transition: "0.5s",
    boxShadow: "0 3px 6px 0 rgb(255 0 0 / 84%)",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 4,
  },
  link: {
    textDecoration: "none",
    textTransform: "none",
  },
});

function AdminCompaniesList({ companies }) {
  const classes = useStyles();

  const [allCompanies, setAllCompanies] = useState([]);
  console.log(companies);
  useEffect(() => {
    setAllCompanies(companies);
  }, [companies]);

  const { request } = useHttp();
  const blockHandler = async (company) => {
    try {
      const response = await request("/api/company/update", "POST", company);
      setAllCompanies(
        allCompanies.map((e) => (e._id !== response._id ? e : response))
      );
    } catch (e) {
      console.log(e);
    }
  };

  if (!allCompanies.length) {
    return <div>No Companies!</div>;
  }
  return (
    <div className={classes.root}>
      {allCompanies.map((company) => {
        return (
          <Card
            className={company.isActive ? classes.card : classes.cardBanned}
            key={company._id}
          >
            <CardContent style={{ textAlign: "center", paddingBottom: "0px" }}>
              <div style={{ textAlign: "center" }}>
                <img
                  style={{
                    width: "100px",
                    height: "auto",
                    borderRadius: "100px",
                  }}
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
                Price: {company.priceList}$
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Rating: {company.rating}
              </Typography>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              {company.isActive ? (
                <Button size="small" onClick={() => blockHandler(company)}>
                  Block
                </Button>
              ) : (
                <Button size="small" onClick={() => blockHandler(company)}>
                  Unblock
                </Button>
              )}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default AdminCompaniesList;
