import React from 'react';
//import logo from './logo.svg';
import styles from './style.scss';
import Hand from './Hand.js'
import {
    Grid, Typography,
} from '@material-ui/core/'
import Button from '@material-ui/core/Button';
import { Spacing } from '../../components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


class TexasHoldemGamePage extends React.Component{

  constructor(props) {
    super(props);
    this.socket = this.props.client.socket;
    this.BetNUmber = React.createRef();
    this.state = {
      display:true,
      leftTablePlayers:
      [
        {
          playerName:"Left",
          playerID:2,
          playerPosition: 0,
          specialStatusString: "",

          cardArray:[
            {
              cardID:1,
              cardHidden:true,
            },
            {
              cardID:2,
              cardHidden:true,
            }
          ],

          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"John",
          playerID:1,
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:1,
              cardHidden:true,
            },
            {
              cardID:2,
              cardHidden:true,
            }
          ],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"Alex",
          playerID:4,
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:1,
              cardHidden:true,
            },
            {
              cardID:2,
              cardHidden:true,
            }
          ],
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
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:1,
              cardHidden:true,
            },
            {
              cardID:2,
              cardHidden:true,
            }
          ],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"John",
          playerID:1,
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:12,
              cardHidden:true,
            },
            {
              cardID:28,
              cardHidden:true,
            }
          ],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"Alex",
          playerID:4,
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:19,
              cardHidden:true,
            },
            {
              cardID:15,
              cardHidden:true,
            }
          ],
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
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:43,
              cardHidden:true,
            },
            {
              cardID:34,
              cardHidden:true,
            }
          ],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"John",
          playerID:1,
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:36,
              cardHidden:true,
            },
            {
              cardID:24,
              cardHidden:true,
            }
          ],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
        {
          playerName:"Alex",
          playerID:4,
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:46,
              cardHidden:true,
            },
            {
              cardID:48,
              cardHidden:true,
            }
          ],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
      ],
      self:[
        {
          playerName:"Bob",
          playerID:3,
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:'2c',
              cardHidden:true,
            },
            {
              cardID:'Kd',
              cardHidden:true,
            }
          ],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
      ],
      communityCards:[
        {
          playerName:"Community Card",
          playerID:0,
          chipAmount:0,
          playerPosition:0,
          cardArray:[
            {
              cardID:"AD",
              cardHidden:false,
            },
            {
              cardID:"2C",
              cardHidden:false,
            },
            {
              cardID:"KC",
              cardHidden:false,
            },
            {
              cardID:"JS",
              cardHidden:false,
            },
            {
              cardID:3,
              cardHidden:false,
            },
          ],
          cardSum: 0,
          betAmount: 0,
          folded: false,
        },
      ],
      lastPlayerBetAmount:0,
      potTotal:0,
      open:false,
      setOpen:false,
      turnPosition:0,
      dealersPosition:0,
      selfPosition:0,
      round:'',
      winOpen:false,
      loseOpen:false,
    }
  }
  handleOpen(){
    this.setState(((state) => {return {open: true}}));
  };
  handleClose(){
    this.setState(((state) => {return {open: false}}));
  };


  handleChange(e){
    let betValue = e.target.value;
    //console.log("E IS THIS", betValue);
    this.setState(((state) => {return {bet:betValue}}));
  }

  handleWin(){
    this.setState(((state) => {return {winOpen: true}}));
  };

  handleWinClose(){
    this.setState(((state) => {return {winOpen: false}}));
  };
  handleLose(){
    this.setState(((state) => {return {loseOpen: true}}));
  };
  handleLoseClose(){
    this.setState(((state) => {return {loseOpen: false}}));
  };

  matchBet(){
    var arr = this.state.self;
    this.socket.emit('checkOrCall', {
      userID: this.state.self[0].playerID,
    });
  }
  addBet(num){
    var arr = this.state.self;
    arr[0].betAmount = arr[0].betAmount + parseInt(this.state.bet);
    this.setState(((state) => {return {self: arr}}));
    this.socket.emit('raise', {
      userID: this.state.self[0].playerID,
      amount: num,
    });
    //arr
  }
  fold(e){
    //arr
    var arr = this.state.self;
    arr[0].folded = true;
    document.getElementsByName("AddBet").disabled = true;
    this.setState(((state) => {return {self: arr}}));
    this.socket.emit('fold', {
      userID: this.state.self[0].playerID,
    });
  }
  reveal(num){

    var arr = this.state.self;
    arr[0].cardArray[num].cardHidden = false;
    this.setState(((state) => {return {self: arr}}));

  }
  render() {
    if(!this.state.display){
      return(<React.Fragment/>)
    }
    return (

      <>
      <div className = "container-GamePage" >
      <Grid item xs>
        {/* <Typography variant="h4">Texas Holdem</Typography> */}
        <Spacing height={1} />
      </Grid>

        <div className="TopTable" >
          <Grid
            container
            direction="row"
            justify="flex"
            alignItems="flex"
            alignContent="flex"
            spacing={2}>
              {this.state.topTablePlayers.map((elem,index) => (
                <Grid item xs={12} m={3} md={3} key={index}>
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
                  {this.state.leftTablePlayers.map((elem,index) => (
                    <Grid item xs={12} m={4} md={4} key={index}>
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
                  {this.state.rightTablePlayers.map((elem,index)=> (
                    <Grid item xs={12} m={4} md={4} key={index}>
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

                <div className = "Dealer">
                {this.state.communityCards.map((elem,index) => (
                  <Grid item xs={12} m={4} md={4} key ={index} >
                    <Hand hand = {elem} flex-grow = {4}> </Hand>
                  </Grid>
                ))}
                </div>
                <div className = "Self">
                {this.state.self.map(elem => (
                  <Grid item xs={12} m={4} md={4} >
                    <Hand hand = {elem} flex-grow = {4}> </Hand>
                  </Grid>
                ))}
                </div>

              </Grid>

            </Grid>

          </Grid>
        </div>
        <div className = "controls">



        <Grid item container direction="row" alignItems="center" justify="center" alignContent="center" spacing={2} xs>
            <Grid item xs={5}><TextField type = "number" ref = {this.BetNUmber} fullWidth value= {this.state.bet} onChange ={(e)=>{this.handleChange(e)}}/></Grid>
            <Grid item xs={5}><Button size = "medium" color="primary" fullWidth onClick={(e) => { this.addBet(e)}}>
              Bet/Raise
            </Button></Grid>
          </Grid>

          <Button size="medium" color="primary" onClick={() => this.matchBet(0)}>

            Call/Check
          </Button>
          <Button size="medium" color="primary" onClick={() => { this.fold() }}>
            Fold
          </Button>
          <Button size="medium" color="primary" onClick={() => this.handleOpen()}>
            Reveal Right
          </Button>
          <Dialog
            open={this.state.open}
            onClose={() => { this.handleClose() }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"It is your turn to play!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {"The last player betted " + this.state.lastPlayerBetAmount + " and the pot total is " + this.state.potTotal}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.handleClose() }} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.winOpen}
            onClose={() => { this.handleWinClose() }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"You Win!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {"The last player betted " + this.state.lastPlayerBetAmount + " and the pot total is " + this.state.potTotal}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.handleWinClose()  }} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.loseOpen}
            onClose={() => { this.handleLoseClose() }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"You lose!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {"The last player betted " + this.state.lastPlayerBetAmount + " and the pot total is " + this.state.potTotal}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.handleLoseClose()  }} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          </div>
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
