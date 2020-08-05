import React from "react";
import axios from "axios";

import {
  LoginPanel,
  Navigator,
  UserPanel,
  MatchPanel,
  StorePanel,
  LeaderBoardPanel,
  NewsPanel,
  ManagementPanel,
  MultiChat,
  ReportPanel,
  CreditPanel,
  UpdatesPanel,
  Matcher,
  Lobby,
} from './views';

import {
  FloatWindowController,
  ChatPool,
} from './components';

import { User } from './models';

import { CssBaseline, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from "./theme";
import "./global.scss";

import socketIOClient from "socket.io-client";
import { setupUserSocket, setupGameSocket } from "./sockets";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.navigator = React.createRef();
    this.lobby = React.createRef();
    this.multiChat = React.createRef();
    this.chatPool = new ChatPool(this);

    this.windowController = React.createRef();
    this.windowInit = this.windowInit.bind(this);

    let user = new User();

    this.state = {
      user: user
    };
  }

  componentDidMount() {
    let socket_url = (process.env.NODE_ENV === "development") ? "http://localhost:3001" : undefined;

    // setup websockets
    this.socket = socketIOClient(socket_url);
    this.socket.on('message', (msg) => {
      if (process.env.NODE_ENV === 'development') console.log(msg);
    })
    setupUserSocket(this.socket, this);
    setupGameSocket(this.socket, this);

    window.addEventListener('pageshow', this.windowInit);    
  }

  windowInit() {
    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    this.windowController.current.init(center, 'Navigator');
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
      this.chatPool.init(this.state.user, this.multiChat).then(() => { });
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
      email: this.user.updateEmail,
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
      console.log(err);
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
        await this.state.user.create(data);
        logged_user = await this.state.user.login(data);
      } else {
        logged_user = await this.state.user.login(data);
      }

      this.setState((state) => {
        return { user: logged_user };
      });

      this.chatPool.init(this.state.user, this.multiChat).then(() => { });
      this.socket.emit('user-handshake', logged_user.id);
      this.navigator.current.setDisplay(logged_user.display_setting, 1);
    } catch (err) {
      throw err;
    }
  }

  async logout(emit=true) {
    /**
     * logs out the logged in user
     */

    if (emit) this.socket.emit('user-logout', this.user.id);
    this.unmatch();

    const empty_user = await this.user.logout();
    this.setState((state) => {
      return { user: empty_user };
    });
    this.navigator.current.setDisplay(empty_user.display_setting, 0);
    this.windowInit();
    this.chatPool.reset();

  }


  // matching

  match() {
    this.matching = true;
    this.socket.emit('match', this.user.id);
  }

  unmatch() {
    if (!this.matching) return;

    this.matching = false;
    this.socket.emit('unmatch', this.user.id);
    this.windowController.current.hide('Match');
  }

  game_leave() {
    /**
     * Leave the game
     */

    this.in_game = false;
    this.socket.emit('game_leave', this.user.id);
  }

  render() {
    // pages: [login_register, match, chat, store, leaderboard, news, update, management, billing, report, user_info(always false)]

    const list = {

      'login / register': <LoginPanel client={this} />,
      'match': <MatchPanel client={this} />,
      'store': <StorePanel client={this} />,
      'leaderboard': <LeaderBoardPanel client={this} />,
      'news': <NewsPanel client={this} />,
      'update': <UpdatesPanel client={this} />,
      'management': <ManagementPanel client={this} />,
      'billing': <CreditPanel client={this} />,
      'report': <ReportPanel client={this} />,
      'user info': <UserPanel client={this} />,

    };

    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <FloatWindowController ref={this.windowController} client={this} windows={{
          'Navigator': { content: <Navigator list={list} client={this} ref={this.navigator} />, width: 1100, height: 800, variant: 'transparent'},
          'Match': { content: <Matcher client={this} />, width: 300, height: 300, variant: 'full', nonClosable: true},
          'Lobby': { content: <Lobby client={this} ref={this.lobby} />, width: 300, height: 600, variant: 'full', nonClosable: true},
          'Chat': { content: <MultiChat client={this} pool={this.chatPool} ref={this.multiChat} />,  width: 700, height: 400, variant: 'full', nonPadded: true}
        }}/>
      </ThemeProvider>
    );
  }
}

export default App;
