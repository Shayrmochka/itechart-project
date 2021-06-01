import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useHttp from '../../hooks/http.hook';
import Loader from '../../components/Loader';
import CompaniesList from '../../components/companies/CompaniesList';
import useMessage from '../../hooks/message.hook';

const useStyles = makeStyles(() => ({
  companiesWrapper: { marginTop: '20px' },

}));

function CompaniesPage() {
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const [searchCompanies, setSearchCompanies] = useState(null);
  const { loading, request } = useHttp();
  const message = useMessage();

  const fetchCompanies = useCallback(async () => {
    try {
      const fetched = await request('/api/company', 'GET', null);
      setCompanies(fetched);
    } catch (e) { message(e); }
  }, [message, request]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const getSearchData = (value) => {
    setSearchCompanies(
      companies.filter((company) => `${company.name} ${company.address}`
        .toLowerCase()
        .includes(value.toLowerCase())),
    );
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={classes.companiesWrapper}>
      {!loading && (
        <CompaniesList
          companies={searchCompanies === null ? companies : searchCompanies}
          getSearchData={getSearchData}
        />
      )}
    </div>
  );
}

export default CompaniesPage;
