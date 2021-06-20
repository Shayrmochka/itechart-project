/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import SocialLogin from 'react-social-login';
import { Button } from '@material-ui/core';

// interface SocialButtonProps {
//   children: string,
//   triggerLogin: any,
//   other: any,
// }
// : React.FC<SocialButtonProps>
const SocialButton = ({ children, triggerLogin, ...other }) => (
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

export default SocialLogin(SocialButton);
