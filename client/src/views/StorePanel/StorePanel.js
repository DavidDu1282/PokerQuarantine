import React from 'react';
//import logo from './logo.svg';

import StoreCard from './StoreCard.js'
import {
    Grid, Typography,
} from '@material-ui/core/'

class StorePanel extends React.Component{
  state = {
    StoreCard:[
      {
        id:1,
        title:'Basic Purchase',
        description : 'The minimum purchase, no discount',
        amount: 5.99
      },
      {
        id:2,
        title:'Medium Purchase',
        description : 'A small discount for spending more',
        amount: 10.99
      },
      {
        id:3,
        title:'Large Purchase',
        description : 'The largest discount available in a purchase',
        amount: 20.99
      }
    ]
  }
  render() {
    return (
      <div className="container-padded" >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
          spacing={4}
        >
          <Grid item><Typography variant="h4">Store</Typography></Grid>
          <Grid item container spacing={2} direction="row" justify="flex-end" alignItems="flex-start" >
            {this.state.StoreCard.map(elem => (
              <Grid item xs={12} sm={4} md={4} key={this.state.StoreCard.indexOf(elem)}>
                <StoreCard storeCard = {this.state.StoreCard[this.state.StoreCard.indexOf(elem)]}> </StoreCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>

    );
  }
}

export default StorePanel;
