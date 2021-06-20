import React from 'react';

interface ErrorProps {
  error: string
}

const Error: React.FC<ErrorProps> = ({ error }) => (
  <div>
    <h1>Error Page</h1>
    <p>{error.toString()}</p>
  </div>
);

export default Error;
