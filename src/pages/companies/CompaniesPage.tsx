import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useHttp from '../../hooks/http.hook';
import Loader from '../../components/Loader';
import CompaniesList from '../../components/companies/CompaniesList';
import useMessage from '../../hooks/message.hook';
import { ICompany } from '../../interfaces/models.interfaces';

const useStyles = makeStyles(() => ({
  companiesWrapper: { marginTop: '20px' },

}));

const CompaniesPage = () => {
  const classes = useStyles();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchCompanies, setSearchCompanies] = useState<ICompany[] | null>(null);
  const { loading, request } = useHttp();
  const message = useMessage();

  const fetchCompanies = useCallback(async () => {
    try {
      const fetched: ICompany[] = await request('/api/company', 'GET', null);
      setCompanies(fetched);
    } catch (e) { message(e); }
  }, [message, request]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const getSearchData = (value: string) => {
    const search: ICompany[] = companies.filter((company) => `${company.name} ${company.address}`
      .toLowerCase()
      .includes(value.toLowerCase()));
    setSearchCompanies(search);
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
};

export default CompaniesPage;
