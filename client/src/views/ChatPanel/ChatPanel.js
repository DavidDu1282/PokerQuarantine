import React  from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Spacing } from '../../components';
import moment from 'moment';

class ChatPanel extends React.Component {

  constructor(props) {
    super(props);
    this.socket = this.props.client.socket;
    //
  }

  // insert chat(msg, user) 

  render(){
    return(
      <div className="container">
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4">Chat</Typography>
            <Spacing height={2} />
          </Grid>

          {/* Chat dialouge */}
          <Grid item container direction="row">
            <Grid item xs={10}><TextField variant="outlined" fullWidth/></Grid>
            <Grid item xs={2}><Button variant="contained" color="primary" endIcon={<SendIcon/>}>
              Send
            </Button></Grid>  
          </Grid>
        </Grid>
      </div>
  );
}
}
export default ChatPanel;
