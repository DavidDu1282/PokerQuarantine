import React  from 'react';
import { Typography, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Spacing } from '..';
import moment from 'moment';
import './style.scss';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.socket = props.client.socket;
    this.chatText = React.createRef();
    this.msgEnd = React.createRef();
    this.pool = props.pool;
    this.state = {
      msgArr:[
      ],
      textMessage:''
    }
    //
  }

  componentDidMount() {
    this.msgEnd.current.scrollIntoView({ behavior: "smooth" });
  }

  insertChat(msg, user,date){
    var arr = this.state.msgArr;
    arr.push({
      user: user,
      text: msg,
      date: moment(date),
    },)
    this.setState(((state) => {return {msgArr: arr}}));

    this.msgEnd.current.scrollIntoView({ behavior: "smooth" });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) this.sendMessage(e);
  }

  sendMessage(e){
    var message = this.state.textMessage;

    if (message === '') return;

    var now = new Date();
    //console.log(this.chatText.current.value);
    this.insertChat(message, this.props.client.user, now);
    this.setState(((state) => {return {textMessage:''}}));

    // send msg
    this.socket.emit('chat', {
      user: {name: this.props.client.user.name, avatar_url: this.props.client.user.avatar_url},
      text: message,
      time: now
    });
  }

  handleChange(e){
    let message = e.target.value;
    //console.log(e.target.value);
    this.setState(((state) => {return {textMessage:message}}));

  }

  render(){
    return(
      <div onKeyDown={e => this.handleKeyDown(e)} className="containerMessage">
        <Grid
          container
          direction="column"
          spacing={2}
        >
          <Grid item xs>

            <div className="containerMessageContext">
            <Grid item container spacing={2} direction="column" justify="flex-start" alignItems="flex-start" alignContent = "flex-end" wrap = 'nowrap'>
              <Grid item>
                <Typography variant="body2" color="textSecondary">Welcome to the {this.props.channelName} chat</Typography>
              </Grid>
              {this.state.msgArr.map((elem, index )=> (
                <Grid item container spacing={2} direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start" key={index}>
                  <Grid item><Avatar alt={elem.user.name} src={elem.user.avatar_url} /></Grid>
                  <Grid item>
                    <Typography variant="subtitle2" color="primary" display="inline">{`${elem.user.name}`} </Typography>
                    <Typography variant="body2" color="textSecondary" display="inline">{`on ${elem.date.format("H:m MMM Do, YYYY")}`}<br/></Typography>
                    <Typography variant="body1">{`${elem.text}`}</Typography>
                  </Grid>
                </Grid>
              ))}
              <Grid item ref={this.msgEnd}></Grid>
            </Grid>
            </div>

          </Grid>

          <Grid item container direction="row" alignItems="center" justify="center" alignContent="center" spacing={2} xs>
            <Grid item xs={10}><TextField variant="outlined" ref = {this.chatText} fullWidth value= {this.state.textMessage} onChange ={(e)=>{this.handleChange(e)}}/></Grid>
            <Grid item xs={2}><Button variant="contained" color="primary" fullWidth endIcon={<SendIcon/>} onClick={(e) => { this.sendMessage(e)}}>
              Send
            </Button></Grid>
          </Grid>
        </Grid>
      </div>
  );
}
}
export default Chat;
