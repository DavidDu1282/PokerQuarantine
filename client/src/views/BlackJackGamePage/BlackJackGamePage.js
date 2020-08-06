import React from 'react';
//import logo from './logo.svg';
import styles from './style.scss';
import Hand from './Hand.js'
import {
    Grid, Typography,
} from '@material-ui/core/'
import Button from '@material-ui/core/Button';
import { Spacing } from '../../components';
class GamePage extends React.Component{
  state = {
    otherPlayers:
    [
      {
        playerName:"David",
        playerID:0,
        cardIDs:[1,2,3,4],
        cardHidden:0,
        cardSum: 0
      },

    ],
    self:[
      {
        playerID:0,
        cardIDs:[1,2,3],
        cardHidden:0,
        cardSum: 0
      },
    ],
  }
  /*
  addCard(e){
    alert("Add Card!");
  }
  commitHand(e){
    alert("Commit Hand!");
  }
  */
  render() {
    return (
      <>
      <div className = "empty-spacing">
      <Grid item xs>
        <Typography variant="h4">BlackJack</Typography>
        <Spacing height={1} />
      </Grid>
      </div>
        <div className="TopTable" >
          <Grid
            container
            direction="row"
            justify="flex"
            alignItems="flex"
            alignContent="flex"
            spacing={2}>
              {this.state.otherPlayers.map(elem => (
                <Grid item xs={12} m={3} md={3} key={elem}>
                  <Hand hand = {elem}> </Hand>
                </Grid>
              ))}
          </Grid>
        </div>
        <div className="LeftTable" >
          <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex"
              alignContent="flex"
              spacing={2}>

              <Grid item xs>
                <Grid item container spacing={2} direction="column" justify="flex-end" alignItems="flex-start" >
                  {this.state.otherPlayers.map(elem => (
                    <Grid item xs={12} m={4} md={4} key={this.state.otherPlayers.indexOf(elem)}>
                      <Hand hand = {elem} flex-grow = {4}> </Hand>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
          </Grid>
        </div>


        <div className="RightTable" >
          <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex"
              alignContent="flex"
              spacing={2}>
              <Grid item xs>
                <Grid item container spacing={2} direction="column" justify="flex-end" alignItems="flex-start" >
                  {this.state.otherPlayers.map(elem => (
                    <Grid item xs={12} m={4} md={4} key={this.state.otherPlayers.indexOf(elem)}>
                      <Hand hand = {elem} flex-grow = {3}> </Hand>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
          </Grid>
        </div>
        <div className = "centerTable">
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex"
            alignContent="flex"
            spacing={2}>
            <Grid item xs>
              <Grid item container spacing={2} direction="column" justify="flex-end" alignItems="flex-start" >
                {this.state.self.map(elem => (
                  <Grid item xs={12} m={4} md={4} key={this.state.otherPlayers.indexOf(elem)}>
                    <Hand hand = {elem} flex-grow = {4}> </Hand>
                  </Grid>
                ))}
              </Grid>
              <Button size="large" color="primary" onClick={() => {  }}>
                Add Card to Hand
              </Button>
              <br></br>
              <Button size="large" color="primary" onClick={() => {  }}>
                Commit Hand
              </Button>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default GamePage;
