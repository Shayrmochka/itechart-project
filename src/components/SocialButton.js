import React from "react";
import SocialLogin from "react-social-login";
import { Button } from "@material-ui/core";

class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        onClick={triggerLogin}
        {...props}
      >
        {children}
      </Button>
    );
  }
}

export default SocialLogin(SocialButton);
