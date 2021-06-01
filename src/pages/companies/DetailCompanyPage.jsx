import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/http.hook';
import Loader from '../../components/Loader';
import CompanyCard from '../../components/companies/CompanyCard';
import useMessage from '../../hooks/message.hook';

function DetailCompanyPage() {
  const { request, loading } = useHttp();
  const message = useMessage();
  const [company, setCompany] = useState(null);
  const companyId = useParams().id;

  const getCompany = useCallback(async () => {
    try {
      const fetched = await request(`/api/company/${companyId}`, 'GET', null);
      setCompany(fetched);
    } catch (e) { message(e); }
  }, [companyId, message, request]);

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && company && <CompanyCard company={company} />}</div>;
}

export default DetailCompanyPage;
