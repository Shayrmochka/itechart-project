import React from "react";

function CompanyCard({ company }) {
  console.log(company);
  return (
    <div>
      <h3>Company</h3>

      <p>{company.name}</p>
    </div>
  );
}

export default CompanyCard;
