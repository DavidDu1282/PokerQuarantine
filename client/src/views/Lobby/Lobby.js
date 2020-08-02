import React from 'react';
import { Typography, CircularProgress, Button, Avatar } from '@material-ui/core';
import Axios from 'axios';

class Lobby extends React.Component {
  /**
   * Fake Lobby used to test matching
   * ---------------------
   */

  constructor(props) {
    super(props);

    this.client = props.client;
    this.state = {
      id: '',
      players: []
    };
  }

  setId(id) {
    this.setState((state) => {
      return { id: id };
    });
  }

  addPlayers(players) {
    players.map((playerId) => {
      this.addPlayer(playerId);
    })
  }

  async addPlayer(playerId) {
    let res = await Axios.get(`/users/${playerId}`);
    
    let players_ = this.state.players;
    players_.push(res.data);

    this.setState((state) => {
      return { players: players_ };
    });
  }

  reset() {
    this.setState((state) => {
      return { players: [] };
    })
  }

  render() {
    const user_display = [];
    
    this.state.players.map((player) => {
      user_display.push(<Typography key={player.name}><Avatar alt={player.name} src={player.avatar_url} component="span" />{player.name}<br/></Typography>);
    });

    return (
      <div>
        <Typography>In Lobby: {this.state.id}<br/></Typography>
        {user_display.length > 0 ? user_display : (<CircularProgress color="primary"/>)}
        {user_display.length > 0 ? (<Button color="secondary" onClick={() => this.client.game_leave()}>leave lobby</Button>) : (<React.Fragment />)}
      </div>
    );
  }
}

export default Lobby;