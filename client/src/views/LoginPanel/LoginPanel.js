import React from "react";
import { Grid, Typography, Button, Link, Fade } from "@material-ui/core";
import { Spacing, GoogleIcon, QuickForm } from "../../components";

import GoogleOAuth from "../GoogleOAuth";
import moment from "moment";
import "./LoginPanel.scss";

class LoginPanel extends React.Component {
  /**
   * The login panel
   */

  constructor(props) {
    super(props);

    this.login_form = React.createRef();
    this.register_form = React.createRef();
    this.state = {
      page_index: 0,
    };
  }

  // event handlers

  async onLogin(result) {
    // if error
    if (!result) return;

    const data = {
      email: result.body.email,
      password: result.body.password,
    };

    try {
      await this.props.client.auth(data);
    } catch (err) {
      this.login_form.current.setErrorState("password", err.message);
      return;
    }

    // alert(JSON.stringify(result.body));
  }

  async onRegister(result) {
    // if error
    if (!result) return;

    const { username, email, dob, password, re_password, tnc } = result.body;
    let email_regrex = /(\w+@\w+\.\w+)/g;

    // detect formatting errors
    if (password !== re_password) {
      this.register_form.current.setErrorState(
        "re_password",
        `Passwords do not match.`
      );
      return;
    } else if (!email.match(email_regrex)) {
      this.register_form.current.setErrorState(
        "email",
        "Please enter a valid email."
      );
      return;
    } else if (dob.isAfter(moment().subtract(19, "years"))) {
      this.register_form.current.setErrorState(
        "dob",
        "You must be 19 or older to register."
      );
      return;
    } else if (!tnc) {
      this.register_form.current.setErrorState(
        "tnc",
        "Please agree to the terms and conditions."
      );
      return;
    }

    const data = {
      username: username,
      email: email,
      dob: dob,
      password: password,
    };

    try {
      await this.props.client.auth(data, true);
    } catch (err) {
      switch (err.message) {
        case "username-duplicate":
          this.register_form.current.setErrorState(
            "username",
            "Username already exists."
          );
          break;
        case "email-duplicate":
          this.register_form.current.setErrorState(
            "email",
            "Email has been registered with an existing account."
          );
          break;
        default:
      }
    }
  }

  render() {
    const handleLogin = async (result) => {
      await this.onLogin(result);
    };
    const handleRegister = async (result) => {
      await this.onRegister(result);
    };

    const login_page = (
      <Grid
        container
        alignItems="flex-start"
        alignContent="center"
        justify="center"
        direction="column"
        spacing={1}
      >
        <Grid item xs>
          <Typography variant="h5">Welcome Back</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body2" color="textSecondary">
            Login with your PokerQuarantine account.
          </Typography>
        </Grid>
        <Grid item xs>
          <Spacing height={1} />
        </Grid>
        <QuickForm
          fields={{
            email: {
              label: "Email",
              type: "text",
            },
            password: {
              label: "Password",
              type: "password",
            },
            //"remember": {
            //label: "Remember me",
            //type: "checkbox" }
          }}
          name="signin"
          tBoxVariant="filled"
          button={
            <React.Fragment key="spacing button">
              <Grid item xs>
                <Spacing height={2} />
              </Grid>
              <Grid container key="button" alignItems="center">
                <Grid item xs={10}>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState((state) => {
                        return { page_index: 1 };
                      });
                    }}
                  >
                    Register
                  </Link>{" "}
                  <br />
                  <Link>Reset Password</Link>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          }
          ref={this.login_form}
          onSubmit={handleLogin}
        />

        <Grid item xs>
          <Spacing height={3} />
          <Typography variant="body2" color="textSecondary">
            Or sign in with a third-party account:
          </Typography>
          <Spacing height={1} />
        </Grid>
        <Grid item xs>
          <GoogleOAuth />
        </Grid>
      </Grid>
    );
    const register_page = (
      <Grid
        container
        alignItems="flex-start"
        alignContent="center"
        justify="center"
        direction="column"
        spacing={1}
      >
        <Grid item xs>
          <Typography variant="h5">Register a new account</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body2" color="textSecondary">
            We'll just need some personal information of yours.
          </Typography>
        </Grid>
        <Grid item xs>
          <Spacing height={1} />
        </Grid>
        <QuickForm
          fields={{
            username: {
              label: "Username",
              type: "text",
            },
            email: {
              label: "Email",
              type: "email",
            },
            dob: {
              label: "Date of Birth",
              type: "date",
              disableFuture: true
            },
            password: {
              label: "Password",
              type: "password",
            },
            re_password: {
              label: "Re-enter Password",
              type: "password",
            },
            tnc: {
              label: "I have read and agree to the Terms & Conditions",
              type: "checkbox",
            },
          }}
          name="register"
          tBoxVariant="filled"
          button={
            <React.Fragment key="spacing button">
              <Grid item xs>
                <Spacing height={2} />
              </Grid>
              <Grid container key="button" alignItems="center">
                <Grid item xs={10}>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState((state) => {
                        return { page_index: 0 };
                      });
                    }}
                  >
                    Already have an account? Login
                  </Link>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    register
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          }
          onSubmit={handleRegister}
          ref={this.register_form}
        />
      </Grid>
    );

    return (
      <div className="container">
        {this.state.page_index === 0 && (
          <Fade in={this.state.page_index === 0}>{login_page}</Fade>
        )}
        {this.state.page_index === 1 && (
          <Fade in={this.state.page_index === 1}>{register_page}</Fade>
        )}
      </div>
    );
  }
}

export default LoginPanel;
