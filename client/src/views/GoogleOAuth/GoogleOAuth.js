import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { GoogleIcon } from "../../components";
import { API_URL } from "../config";
class GoogleOAuth extends React.Component {
  //check if popup window is closed then refresh main page
  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || !popup.closed) return;
      clearInterval(check);
      window.location.reload();
    }, 100);
  }

  openPopup() {
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/api/auth/google`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth = () => {
    this.popup = this.openPopup();
    this.checkPopup();
  };

  render() {
    return (
      <Button
        size="medium"
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={this.startAuth}
      >
        Sign in with Google
      </Button>
    );
  }
}
export default GoogleOAuth;
