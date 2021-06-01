/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import SocialLogin from 'react-social-login';
import { Button } from '@material-ui/core';

function SocialButton(props) {
  const { children, triggerLogin, ...other } = props;
  return (
    <Button
      fullWidth
      variant="outlined"
      color="secondary"
      onClick={triggerLogin}
      {...other}
    >
      {children}
    </Button>
  );
}

SocialButton.propTypes = {
  children: PropTypes.string.isRequired,
  triggerLogin: PropTypes.func.isRequired,
};

export default SocialLogin(SocialButton);
