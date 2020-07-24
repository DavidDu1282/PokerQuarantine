import React  from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Spacing } from '../../components';
import moment from 'moment';
import './style.scss';

class ChatPanel extends React.Component {

  constructor(props) {
    super(props);
    this.socket = this.props.client.socket;
    this.chatText = React.createRef();
    this.state = {
      msgArr:[
      ],
      textMessage:''
    }
    //
  }

  insertChat(msg, user,date){
    var arr = this.state.msgArr;
    arr.push({
      user: user,
      text: msg,
      date: moment(date),
    },)
    this.setState(((state) => {return {msgArr: arr}}));
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
      <div className="containerMessage">
        <Grid
          container
          direction="column"
          spacing={2}
        >
          <Grid item xs>
            <Typography variant="h4">Chat</Typography>
            <Spacing height={2} />
          </Grid>
          <Grid item xs>
          <div className = "containerMessageContext">
          <Grid item container spacing={2} direction="column" justify="flex-start" alignItems="flex-start" alignContent = "flex-end" wrap = 'nowrap'>
          <Grid item>
            <Typography variant="body2" color="textSecondary">Welcome to the #global chat</Typography>
          </Grid>
          {this.state.msgArr.map((elem, index )=> (
            <Grid item key={index}>
              <Typography variant="body2" color="textSecondary">{`${elem.user.name}, on ${elem.date.format("H:m MMM Do, YYYY")}` }</Typography><br/>
              <Typography variant="body1">{`${elem.text}`}</Typography>
            </Grid>
          ))}
          </Grid>
          </div>
          <br></br>
          </Grid>
          {/* Chat dialouge */}
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
export default ChatPanel;
