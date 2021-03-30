import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import CompanyCard from "../../components/companies/CompanyCard";

function DetailCompanyPage() {
  const { request, loading } = useHttp();
  const [company, setCompany] = useState(null);
  const companyId = useParams().id;

  const getCompany = useCallback(async () => {
    try {
      const fetched = await request(`/api/company/${companyId}`, "GET", null);
      setCompany(fetched);
    } catch (e) {}
    // }, [companyId, request]);
  }, [request]);

  useEffect(() => {
    getCompany();
  }, []);

  console.log(company);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && company && <CompanyCard company={company} />}</div>;
}

export default DetailCompanyPage;
