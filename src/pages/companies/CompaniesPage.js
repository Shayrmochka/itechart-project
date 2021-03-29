import React, { useCallback, useEffect, useState } from "react";

import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import CompaniesList from "../../components/companies/CompaniesList";
import { useMessage } from "../../hooks/message.hook";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const { loading, error, request } = useHttp();

  const message = useMessage();

  const fetchCompanies = useCallback(async () => {
    try {
      const fetched = await request("/api/company", "GET", null);
      console.log(fetched);
      setCompanies(fetched);
      message(fetched.message);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const from = "page";

  if (loading) {
    return <Loader />;
  }
  return (
    <div style={{ marginTop: "20px" }}>
      {!loading && <CompaniesList companies={companies} from={from} />}
    </div>
  );
}

export default CompaniesPage;
