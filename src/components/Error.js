import React from "react";

function Error({ error }) {
  return (
    <div>
      <h1>Error Page</h1>
      <p>{error.toString()}</p>
    </div>
  );
}

export default Error;
