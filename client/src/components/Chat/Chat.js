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
    this.chatText = React.createRef();
    this.msgEnd = React.createRef();
    this.pool = props.pool;
    this.state = {
      textMessage:''
    }
    //
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') this.msgEnd.current.scrollIntoView({ behavior: "auto" });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom(behavior="smooth") {
    this.msgEnd.current.scrollIntoView({ behavior: behavior });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) this.sendMessage(e);
  }

  sendMessage(e){
    var message = this.state.textMessage;

    if (message === '') return;

    this.setState(((state) => {return {textMessage:''}}));
    this.props.sendMessage(message);
    
  }

  handleChange(e){
    let message = e.target.value;
    this.setState(((state) => {return {textMessage:message}}));

  }

  render(){
    const messages_display = [];

    this.props.messages.map((message) => {
      const current_user = this.props.pool.getUser(message.userId);
      messages_display.push(
        <Grid item container style={{width: '95%'}} spacing={2} direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start" key={message.messageId}>
          <Grid item><Avatar alt={current_user.name} src={current_user.avatar_url} /></Grid>
          <Grid item style={{maxWidth: '85%', wordWrap: 'break-word'}}>
            <Typography variant="subtitle2" color={current_user.role === 0 ? "primary" : "secondary"} display="inline">{`${current_user.name}`} </Typography>
            <Typography variant="body2" color="textSecondary" display="inline">{`on ${moment(message.timestamp).format("h:mm A MMM Do, YYYY")}`}<br/></Typography>
            <Typography display="inline" variant="body1">{`${message.context}`}</Typography>
          </Grid>
        </Grid>
      );
    });

    return(
      <div className="containerMessage" onKeyDown={e => this.handleKeyDown(e)}>
        <div className="containerMessageContext" >
          <Grid container style={{paddingTop: '1em'}} spacing={2} direction="column" justify="flex-end" alignItems="center" wrap='nowrap'>
            {messages_display}
            <Grid item ref={this.msgEnd}></Grid>
          </Grid>
        </div>

        <div className="textEntry">
          <TextField ref={this.chatText} fullWidth style={{width: '85%', display: 'inline-block', margin: 'none'}} value= {this.state.textMessage} onChange ={(e)=>{this.handleChange(e)}}/>
          <Button color="primary" fullWidth style={{width: '15%', float: 'right', margin: 'none', marginLeft: '8px'}} endIcon={<SendIcon/>} onClick={(e) => { this.sendMessage(e)}}>
            Send
          </Button>
        </div>

      </div>
  );
}
}
export default Chat;
