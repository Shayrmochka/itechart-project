import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import CompanyCard from "../../components/companies/CompanyCard";

function DetailCompanyPage() {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [company, setCompany] = useState(null);
  const companyId = useParams().id;

  const getCompany = useCallback(async () => {
    try {
      const fetched = await request(`/api/company/${companyId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setCompany(fetched);
    } catch (e) {}
  }, [token, companyId, request]);

  useEffect(() => {
    getCompany();
  }, [getCompany]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && company && <CompanyCard company={company} />}</div>;
}

export default DetailCompanyPage;
