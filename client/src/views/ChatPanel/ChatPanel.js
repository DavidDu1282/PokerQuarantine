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
    var arr = JSON.parse(JSON.stringify(this.state.msgArr));
    arr.push({
      user:user,
      text:msg,
      date :date,
    },)
    this.setState(((state) => {return {msgArr: arr}}));
  }
  sendMessage(e){
    var message = this.state.textMessage;
    //console.log(this.chatText.current.value);
    this.insertChat(message, 'John',  '07/23');
    this.setState(((state) => {return {textMessage:''}}));
  }
  handleChange(e){
    let message = e.target.value;
    //console.log(e.target.value);
    this.setState(((state) => {return {textMessage:message}}));

  }
  render(){
    return(
      <div className="container">
        <Grid
          container
          wrap = 'nowrap'
          direction="column"
          spacing={2}
        >
          <Grid item xs>
            <Typography variant="h4">Chat</Typography>
            <Spacing height={2} />
          </Grid>
          <Grid item container xs>
          <div id='wrapper' className = "containerMessage" style = {{minWidth : '100%', minHeight: '100%'}}>
          <Grid item container spacing={2} direction="column" justify="flex-start" alignItems="flex-start" alignContent = "flex-start" wrap = 'nowrap'>
          {this.state.msgArr.map((elem, index )=> (
            <Grid item key={index}>
              <Typography variant="body1">{`${elem.user.name} said: ${elem.text}, at time:${elem.date}` }
              </Typography>
            </Grid>
          ))}
          </Grid>
          </div>
          <br></br>
          </Grid>
          {/* Chat dialouge */}
          <Grid item container direction="row" xs>
            <Grid item xs={10}><TextField variant="outlined" ref = {this.chatText} fullWidth value= {this.state.textMessage} onChange ={(e)=>{this.handleChange(e)}}/></Grid>
            <Grid item xs={2}><Button variant="contained" color="primary" endIcon={<SendIcon/>} onClick={(e) => { this.sendMessage(e)}}>
              Send
            </Button></Grid>
          </Grid>
        </Grid>
      </div>
  );
}
}
export default ChatPanel;
