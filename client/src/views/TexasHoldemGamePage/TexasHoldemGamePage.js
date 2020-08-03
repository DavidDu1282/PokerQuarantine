import React from 'react';
//import logo from './logo.svg';
import styles from './style.scss';
import Hand from './Hand.js'
import {
    Grid, Typography,
} from '@material-ui/core/'
import Button from '@material-ui/core/Button';
import { Spacing } from '../../components';
class TexasHoldemGamePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      leftTablePlayers:
      [
        {
          playerName:"Left",
          playerID:2,
          cardIDs:[1,2],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"John",
          playerID:1,
          cardIDs:[4,5],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"Alex",
          playerID:4,
          cardIDs:[35,45],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
      ],
      rightTablePlayers:
      [
        {
          playerName:"Right",
          playerID:2,
          cardIDs:[1,2],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"John",
          playerID:1,
          cardIDs:[4,5],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"Alex",
          playerID:4,
          cardIDs:[35,45],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
      ],
      topTablePlayers:
      [
        {
          playerName:"Top",
          playerID:2,
          cardIDs:[1,2],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"John",
          playerID:1,
          cardIDs:[4,5],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"Alex",
          playerID:4,
          cardIDs:[35,45],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
      ],
      self:[
        {
          playerName:"Bob",
          playerID:3,
          cardIDs:[1,2],
          cardHidden:[true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
      ],
      dealer:[
        {
          playerName:"Dealer",
          playerID:0,
          cardIDs:[1,2,3,4,5],
          cardHidden:[true,true,true,true,true],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
      ]
    }
  }

  addBet(num){
    var arr = this.state.self;
    arr[0].betAmount = arr[0].betAmount+num;
    this.setState(((state) => {return {self: arr}}));
    //arr
  }
  fold(e){
    //arr
    var arr = this.state.self;
    arr[0].folded = true;
    this.setState(((state) => {return {self: arr}}));
  }
  reveal(num){

    var arr = this.state.self;
    arr[0].cardHidden[num] = false;
    this.setState(((state) => {return {self: arr}}));

  }
  render() {
    return (
      <>
      <div className = "empty-spacing"></div>
      <div className = "empty-spacing">
      <Grid item xs>
        <Typography variant="h4">Texas Holdem</Typography>
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
              {this.state.topTablePlayers.map(elem => (
                <Grid item xs={12} m={3} md={3} key={elem}>
                  <Hand hand = {elem}> </Hand>
                  <div className="TopTable" ></div>
                </Grid>
              ))}
          </Grid>
        </div>
        <div className="LeftTable" >
          <Grid
              container
              direction="column"
              justify="flex"
              alignItems="flex"
              alignContent="flex"
              spacing={1}>
              <Grid item xs>
                <Grid item container spacing={1} direction="column" justify="flex-end" alignItems="flex-start" >
                  {this.state.leftTablePlayers.map(elem => (
                    <Grid item xs={12} m={4} md={4} key={this.state.rightTablePlayers.indexOf(elem)}>
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
              justify="flex"
              alignItems="flex"
              alignContent="flex"
              spacing={1}>
              <Grid item xs>
                <Grid item container spacing={1} direction="column" justify="flex-end" alignItems="flex-start" >
                  {this.state.rightTablePlayers.map(elem => (
                    <Grid item xs={12} m={4} md={4} key={this.state.rightTablePlayers.indexOf(elem)}>
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
                {this.state.dealer.map(elem => (
                  <Grid item xs={12} m={4} md={4} >
                    <Hand hand = {elem} flex-grow = {4}> </Hand>
                  </Grid>
                ))}
                {this.state.self.map(elem => (
                  <Grid item xs={12} m={4} md={4} >
                    <Hand hand = {elem} flex-grow = {4}> </Hand>
                  </Grid>
                ))}

              </Grid>

            </Grid>

          </Grid>
        </div>
        <div className = "controls">
          <Button size="medium" color="primary" onClick={() => { this.addBet(10) }}>
            Add 10 chips to pot
          </Button>
          <Button size="medium" color="primary" onClick={() => { this.fold() }}>
            Fold
          </Button>
          <br></br>
          <Button size="medium" color="primary" onClick={() => this.reveal(0)}>
            Reveal Left
          </Button>
          <Button size="medium" color="primary" onClick={() => this.reveal(1)}>
            Reveal Right
          </Button>
        </div>
      </>
    );
  }
}
/*disabled = {(() => {
  switch (this.state.self.folded) {
    case true:   return "true";
    default:      return "false";
  }

})()}*/
export default TexasHoldemGamePage;
