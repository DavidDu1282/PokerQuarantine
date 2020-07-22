import React from 'react';
import { 
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { Spacing, QuickForm } from '../../components';



class CreditPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            UpdateTitle: "",
            AboutUpdate: "",
            DateofUpdate: "",
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    firsthandler = (event) => {
        this.setState({
            UpdateTitle: event.target.value
        })
    }
    lasthandler = (event) => {
        this.setState({
            AboutUpdate: event.target.value
        })
    }
    DateofUpdatehandler = (event) => {
        this.setState({
            DateofUpdate: event.target.value
        })
    }

  
    handleSubmit = (event) => {
      const { UpdateTitle, AboutUpdate, DateofUpdate} = event.body;
        alert(`${this.state.UpdateTitle} ${this.state.AboutUpdate}  Registered Successfully !!!!`)
        console.log(this.state);
        this.setState({
            UpdateTitle: "",
            AboutUpdate: "",
            DateofUpdate: "",
         
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
              <Typography variant="h4">Add Credit Card</Typography>
            </Grid>
          <QuickForm 
            fields={{
              "name_on_card": {
                label: "Name on Card",
                type: "text" },
              "card_number": {
                label: "Card Number",
                type: "text" },
              "expiration_date": {
                label: "Expiration Date: 00/00",
                type: "text" },
              "ccv": {
                label: "CCV: 000",
                type: "text" },
              "postal_code": {
                label: "Postal Code",
                type: "text" },
              "country": {
                label: "Country",
                type: "text"
             }
            }}
            name="creditcard"
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
                      Add Card
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

export default CreditPanel