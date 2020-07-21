import React from "react";
import axios from "axios";

import {
  LoginPanel,
  Navigator,
  UserInfoPanel,
  MatchPanel,
  StorePanel,
  LeaderBoardPanel,
  NewsPanel,
  ManagementPanel,
} from "./views";
import { User } from "./models";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from "./theme";
import "./global.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.navigator = React.createRef();

    let user = new User();
    this.state = {
      user: user,
    };
  }

  componentDidMount() {
    this.cookieAuth();
  }

  async cookieAuth() {
    //login with cookie session
    var res = await axios.get("/api/current_user");

    if (res.data !== "") {
      var logged_user;
      logged_user = await this.state.user.cookieLogin(res.data);
      this.setState((state) => {
        return { user: logged_user };
      });
      this.navigator.current.setDisplay(logged_user.display_setting, 1);
    }
  }

  get user() {
    return this.state.user;
  }

  async auth(data, create = false) {
    /**
     * try auth the user with the given data
     * throws error if auth failed
     */

    try {
      var logged_user;

      if (create) {
        logged_user = await this.state.user.create(data);
      } else {
        logged_user = await this.state.user.login(data);
      }

      this.setState((state) => {
        return { user: logged_user };
      });

      this.navigator.current.setDisplay(logged_user.display_setting, 1);
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    /**
     * logs out the logged in user
     */

    const empty_user = await this.user.logout();
    this.setState((state) => {
      return { user: empty_user };
    });
    this.navigator.current.setDisplay(empty_user.display_setting, 0);
  }

  render() {
    // pages: [login_register, match, store, leaderboard, news, management, user_info(always false)]

    const list = {
      "login / register": <LoginPanel client={this} />,
      match: <MatchPanel client={this} />,
      store: <StorePanel client={this} />,
      leaderboard: <LeaderBoardPanel client={this} />,
      news: <NewsPanel client={this} />,
      management: <ManagementPanel client={this} />,
      "user info": <UserInfoPanel client={this} />,
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
