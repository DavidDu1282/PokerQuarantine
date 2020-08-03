import React from 'react';
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { Spacing, QuickForm, MyEmail } from '../../components';
import axios from 'axios';
import { renderEmail } from 'react-html-email'

class InviteFriendPanel extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          name : '0',
          feedback : 'Your friend invited you to play PokerQuarantine!',
          email: '',
        }
      }
      resetForm(){
        this.setState({feedback: ''});
      }
      handleSubmit = (event) => {
        this.setState(((state) => {return {name: event.body}}));
        //this.setState(((state) => {return {email: event.body}}));
        console.log(event);
        const {email} = event.body;
        //alert(`${email} Email Sent Successfully !!!!`);
        /*
        const messageHtml =  renderEmail(
          <MyEmail name={this.state.name}> {this.state.feedback}</MyEmail>
        );
        */
        console.log("Attempting to post request")
        axios.post(
            'api/email/sendEmail',
            {
      	       name: this.state.name,
      	       email: this.state.name,
      	       text: this.state.feedback
            }
        ).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Email sent, awesome!");
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Oops, something went wrong. Try again")
            }
        })

      }

    render() {
        return (
          <div className="container-padded">

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{flexWrap: "nowrap"}}
            spacing={4}
          >
            <Grid item>
              <Typography variant="h4">Invite</Typography>
            </Grid>

          <QuickForm
            fields={{

              "email": {
                label: "Your friend's email",
                type: "text" }
            }}

            name="invites"
            tBoxVariant="filled"
            button={
              <React.Fragment key="spacing button">
                <Grid item xs>
                  <Spacing height={2}/>
                </Grid>
                <Grid container key="button" alignItems="center">

                  <Grid item xs={2}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            }
            onSubmit={this.handleSubmit}
          />
          </Grid>
        </div>


        )
    }
}


export default InviteFriendPanel;
