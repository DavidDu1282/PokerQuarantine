import React from 'react';
import { 
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { Spacing, QuickForm } from '../../components';
import axios from 'axios';


class CreditPanel extends React.Component {
  constructor(props) {
    super(props)

}

handleSubmit = (event) => {
  const {name_on_card, card_number, expiration_date, ccv, postal_code, country} = event.body;
  alert(`${name_on_card} ${card_number} ${expiration_date} ${ccv} ${postal_code} ${country} Registered Successfully !!!!`);
  axios.post('api/creditcard', {name_on_card: name_on_card, card_number: card_number, expiration_date: expiration_date, ccv: ccv, postal_code: postal_code, country: country})
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
                label: "Expiration Date: MM/YY",
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