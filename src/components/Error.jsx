import React from 'react';
import PropTypes from 'prop-types';

function Error({ error }) {
  return (
    <div>
      <h1>Error Page</h1>
      <p>{error.toString()}</p>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
