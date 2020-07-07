import React from 'react';
import { 
  Grid,
  Typography,
  Button,
  Link
} from '@material-ui/core';
import { Spacing, GoogleIcon, QuickForm } from '../../components';
import './LoginPanel.scss';

class LoginPanel extends React.Component {
  /**
   * The login panel
   */

  constructor(props) {
    super(props);

    this.login_form = React.createRef();
    this.state = {
      page_index: 0
    }
  }

  // event handlers

  onLogin(result) {
    // if error
    if (!result) return;

    const data = {
      username: result.body.username,
      password: result.body.password
    };

    try {
      this.props.client.auth(data);
    } catch (err) {
      this.login_form.current.setErrorState("password", err.message);
      return;
    }
    
    // alert(JSON.stringify(result.body));
  }


  render() {
    const handleLogin = (result) => {
      this.onLogin(result);
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
        <Grid item xs><Typography variant="h5">Welcome Back</Typography></Grid>
        <Grid item xs><Typography variant="body2" color="textSecondary">
          Sign in with your PokerQuarantine account.
        </Typography></Grid>
        <Grid item xs><Spacing height={1}/></Grid>
        <QuickForm 
          fields={{
            "username": {
              label: "Username / Email",
              type: "text" },
            "password": {
              label: "Password",
              type: "password" },
            "remember": {
              label: "Remember me",
              type: "checkbox" }
          }}
          name="signin"
          tBoxVariant="filled"
          button={
            <React.Fragment>
              <Grid item xs>
                <Spacing height={2}/>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={10}>
                  <Link
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      this.setState((state) => {
                        return {page_index: 1};
                      });
                    }}>
                    Register
                  </Link> <br/>
                  <Link href="#">Reset Password</Link>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    sign in
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          }
          ref={this.login_form}
          onSubmit={handleLogin}
        />
        
        <Grid item xs><Button
          size="medium"
          variant="outlined"
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button></Grid>
        
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
        <Grid item xs><Typography variant="h5">Register a new account</Typography></Grid>
        <Grid item xs><Typography variant="body2" color="textSecondary">
          We'll just need some personal information of yours.
        </Typography></Grid>
        <Grid item xs><Spacing height={1}/></Grid>
        <QuickForm 
          fields={{
            "username": {
              label: "Username",
              type: "text" },
            "email": {
              label: "Email",
              type: "email" },
            "password": {
              label: "Password",
              type: "password" },
            "re-password": {
              label: "Re-enter Password",
              type: "password" },
            "tnc": {
              label: "I have read and agree to the Terms & Conditions",
              type: "checkbox" }
          }}
          name="register"
          tBoxVariant="filled"
          button={
            <React.Fragment>
              <Grid item xs>
                <Spacing height={2}/>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={10}>
                  <Link
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      this.setState((state) => {
                        return {page_index: 0};
                      });
                    }}
                  >Already have an account? Sign in</Link>
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
          onSubmit={this.onLogin}
        />
      </Grid>
    );

    return (
      <div className="container">
        {this.state.page_index === 0 && login_page}
        {this.state.page_index === 1 && register_page}
      </div>
    );
  }
}

export default LoginPanel;