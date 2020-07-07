import React from 'react';
import { LoginPanel, Navigator, UserInfoPanel } from './views';
import { User } from './models';
import { CssBaseline, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from './theme';
import './global.scss'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.navigator = React.createRef();

    let user = new User();
    this.state = {
      user: user
    };
  }

  get user() {
    return this.state.user;
  }

  auth(data) {
    /**
     * try auth the user with the given data
     * throws error if auth failed
     */

    try {
      let logged_user = this.state.user.login(data);
      this.setState((state) => {
        return {user: logged_user};
      });
      this.navigator.current.setDisplay(logged_user.display_setting, 1);
    } catch (err) {
      throw err;
    }
    
  }

  render() {
    // pages: [login_register, match, store, leaderboard, news, management, user_info(always false)]

    const list = {
      'login / register': <LoginPanel client={this} />,
      'match': <Typography>Match</Typography>,
      'store': <Typography>Store</Typography>,
      'leaderboard': <Typography>Leaderboard</Typography>,
      'news': <Typography>News</Typography>,
      'management': <Typography>Management</Typography>,
      'user info': <UserInfoPanel client={this} />,
    };

    return (
      <ThemeProvider theme={Theme}>
      <CssBaseline />
        <Navigator list={list} client={this} ref={this.navigator} />
      </ThemeProvider>
    );
  }
}

export default App;
