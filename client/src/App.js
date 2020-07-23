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

import socketIOClient from "socket.io-client";
import { setupUserSocket } from "./sockets";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.navigator = React.createRef();

    let user = new User();

    this.state = {
      user: user
    };
  }

  componentDidMount() {
    this.cookieAuth();

    let socket_url = (process.env.NODE_ENV === "development") ? "http://localhost:3001" : undefined;

    // setup websockets
    this.socket = socketIOClient(socket_url);
    this.socket.on('message', (msg) => {
      if (process.env.NODE_ENV === 'development') console.log(msg);
    })
    setupUserSocket(this.socket);
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
      this.socket.emit('user-handshake', logged_user.id);
      this.navigator.current.setDisplay(logged_user.display_setting, 1);
    }
  }

  get user() {
    return this.state.user;
  }

  async updateUser(field, ...args) {
    /**
     * updates the given field of the user
     * -------------------------------
     * params:
     *  field: str
     *  ...args: args for corresponding field
     *
     * return: void
     *
     * err:
     *  Error('invalid field name')
     *  Error('no data')
     *  Error('invalid data')
     */

    const update_functions = {
      avatar: this.user.updateAvatar,
    };

    const update_function = update_functions[field];

    if (update_function == null) {
      throw new Error("invalid field name");
    } else if (args.length === 0) {
      throw new Error("no data");
    }

    // apply update
    try {
      const new_user = await update_function(...args);

      // set for display
      this.setState((state) => {
        return { user: new_user };
      });
      this.forceUpdate();
    } catch (err) {
      throw new Error("invalid data");
    }
  }

  async deleteUser() {
    /**
     * deletes the user, set new display
     * ---------------
     *
     * returns: void
     */

    this.socket.emit('user-logout', this.user.id);

    const empty_user = await this.user.delete();
    this.setState((state) => {
      return { user: empty_user };
    });
    
    this.navigator.current.setDisplay(empty_user.display_setting, 0);
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

      this.socket.emit('user-handshake', logged_user.id);
      this.navigator.current.setDisplay(logged_user.display_setting, 1);
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    /**
     * logs out the logged in user
     */

     this.socket.emit('user-logout', this.user.id);

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
