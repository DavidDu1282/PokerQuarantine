import React from 'react';
import { Grid, List, CircularProgress, ListItem, ListItemText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'
import { Chat } from '../../components';

class MultiChat extends React.Component {
  constructor(props) {
    super (props);
    this.chat = React.createRef();
    this.sendMessage = this.sendMessage.bind(this);

    this.state = {
      ready: props.pool.ready,
      selected: Object.keys(this.props.pool.cache)[0],
    };

  }

  update() {
    // update rendering and scroll to chat bottom
    this.chat.current.forceUpdate();
  }

  updateReady(ready) {
    this.setState(() => {
      return { 
        ready: ready,
      };
    });
  }

  sendMessage(msg) {
    // msg: string
    this.props.pool.addMessage({ context: msg, channelId: this.state.selected });
  }

  render() {
    return (<Grid container spacing={0} style={{height: '100%'}}>
      <Grid item style={{height: '100%'}} xs={3} style={{borderRight: '1px solid rgba(0,0,0,0.23)'}}>
        {(this.state.ready) ?
          (
            <List>
              {
                Object.values(this.props.pool.cache).map((channel) => { return (
                  <ListItem 
                    button
                    key={channel.channelId}
                    selected={this.state.selected === channel.channelId}
                    onClick={() => {
                      this.setState(state => {return { selected: channel.channelId }});
                    }}
                  >
                    <ListItemText primary={channel.channelName} />
                  </ListItem>
                )})
              }
            </List>
          )
          : (
            <Grid item container direction="column" spacing={1}>
              <Grid item><Skeleton variant="rect" height={50} /></Grid>
              <Grid item><Skeleton variant="rect" height={50} /></Grid>
              <Grid item><Skeleton variant="rect" height={50} /></Grid>
            </Grid>
          )
        }
      </Grid>

      <Grid style={{height: '100%'}} item xs={9}>
        {(this.state.ready) ?
          (<Chat ref={this.chat} channelName={this.props.pool.cache[this.state.selected].channelName} messages={this.props.pool.cache[this.state.selected].messages} client={this.props.client} pool={this.props.pool} controller={this} sendMessage={this.sendMessage}/>)
          : (
            <div style={{width: '100%', display: 'flex', alignItems: 'center'}}><CircularProgress /></div>
          )
        }
      </Grid>
    </Grid>)
  }
}

export default MultiChat;