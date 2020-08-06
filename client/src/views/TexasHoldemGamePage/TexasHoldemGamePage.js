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
      display: false,
      lastPlayerBetAmount:0,
      potTotal:0,
      open:false,
      setOpen:false,
      winOpen:false,
      loseOpen:false,
      notYourTurnOpen:false,
      turnPosition:0,
      dealersPosition:0,
      selfPosition:0,
      round:'',

    }
  }

  //Handlers
  handleChange(e){
    let betValue = e.target.value;
    //console.log("E IS THIS", betValue);
    this.setState(((state) => {return {bet:betValue}}));
  }
  //Dialogs
  handleClose(){
    this.setState(((state) => {return {open: false}}));
  };
  handleLose(){
    this.setState(((state) => {return {loseOpen: true}}));
  };
  handleLoseClose(){
    this.setState(((state) => {return {loseOpen: false}}));
  };
  handleNotYourTurn(){
    this.setState(((state) => {return {notYourTurnOpen: true}}));
  }
  handleNotYourTurnClose(){
    this.setState(((state) => {return {notYourTurnOpen: false}}));
  }
  handleWin(){
    this.setState(((state) => {return {winOpen: true}}));
  };
  handleWinClose(){
    this.setState(((state) => {return {winOpen: false}}));
  };
  handleOpen(){
    this.setState(((state) => {return {open: true}}));
  };

  //Game Input Functions


  addBet(num){
    const player = Object.assign({}, this.state.self);
    if(player.folded === false && (player.playerPosition === this.state.turnPosition)){
      player.betAmount = player.betAmount + parseInt(this.state.bet);

      this.setState(((state) => {
        return {self: player}}
      ));
      console.log(this.state.self);


      /*
      this.socket.emit('raise', {
        userID: this.state.self.playerID,
        amount: player.betAmount,
      });
      */
    }
    else{
      this.handleNotYourTurn();
    }
  }

  fold(e){
    var player = this.state.self;
    if(player.folded === false && (player.playerPosition === this.state.turnPosition)){
      player.folded = true;
      this.setState(((state) => {return {self: player}}));
      this.socket.emit('fold', {
        userID: this.state.self.playerID,
      });
    }
    else{
      this.handleNotYourTurn();
    }
  }
  matchBet(){
    var player = this.state.self;
    if(player.folded === false && (player.playerPosition === this.state.turnPosition)){
      this.socket.emit('checkOrCall', {
        userID: this.state.self.playerID,
      });
    }
    else{
      this.handleNotYourTurn();
    }
  }


  initPlayer(user, tableData, hideCards=true) {
    return {
      name: user.name,
      userId: user.id,
      chipAmount: tableData.chips,
      playerPosition: tableData.userIds.indexOf(user.id),
      userStatusString:'',
      cardArray:[
        {
          cardID: tableData.playersHands[user.id][0],
          cardHidden: hideCards,
         },
        {
          cardID:tableData.playersHands[user.id][1],
          cardHidden: hideCards,
        }
      ],

      cardSum: 0,
      betAmount: 0,
      folded: false,
    };
  }

  //Game Receiving input Functions
  get_table(tableData){
    //var topTableData = {};
    var leftTablePlayers = [];
    var rightTablePlayers = [];

    const cache = this.props.cache;
    const userIds = tableData.userIds;
    
    const userLoc = userIds.indexOf(this.client.user.id);
    var leftOfUser = userIds.slice(0, userLoc);
    var rightOfUser = userIds.slice(userLoc+1);

    if (leftOfUser.length === 4) {
      const topUserId = leftOfUser[3];
      leftOfUser = leftOfUser.slice(0, 3);
      rightOfUser = [ topUserId, ...rightOfUser ];
    } else if (rightOfUser.length === 4) {
      const topUserId = rightOfUser[0];
      rightOfUser = rightOfUser.slice(1, 3);
      leftOfUser = [ ...leftOfUser, topUserId ];
    }

    leftOfUser = leftOfUser.reverse();
    leftOfUser.map((userId) => {
      let user = cache.getUser(userId);
      leftTablePlayers.push(this.initPlayer(user, tableData))
    });

    rightOfUser.map((userId) => {
      let user = cache.getUser(userId);
      rightTablePlayers.push(this.initPlayer(user, tableData))
    });

    this.setState((state) => { return {
      leftTablePlayers: leftTablePlayers,
      rightTablePlayers: rightTablePlayers,
    }});

    var temp1 = {
      playerName:"Community Cards",
      //playerID:0,
      chipAmount:0,
      playerPosition:0,
      cardArray: tableData.communityCards.map((cardId) => {
        return {
          cardID: cardId,
          cardHidden: false,
        }
      }),
      betAmount: 0,
    };
    
    this.setState(((state) => {return {
      self: this.initPlayer(this.client.user.userdata, tableData, true),
      selfPosition: userLoc,
      dealersPosition: tableData.dealersPosition,
      potTotal: tableData.pot,
      turnPosition: tableData.turnPosition,
      communityCards: temp1,
    }}));
  }
  /*
  reveal(num){

    var arr = this.state.self;
    arr[0].cardArray[num].cardHidden = false;
    this.setState(((state) => {return {self: arr}}));

  }
  */
  turnOnDisplay(){
    this.setState(((state) => {return {display: true}}));
  }
  turnOffDisplay(){
    this.setState(((state) => {return {display: false}}));
  }
  handleRoundChange(){
    this.state.TopTable.map((elem, index )=> {});
  }
  render() {
    if(!this.state.display){
      return(<React.Fragment/>)
    }
    return (

      <>
      <div className = "container-GamePage" >
        <div className = "center">
          <Typography variant="h4">Texas Holdem</Typography>
          <br></br>
          <Typography variant="h3">{this.state.round}</Typography>
        </div>
        <div className="LeftTable" >
          <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              alignContent="flex-start"
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
              justify="center"
              alignItems="flex-start"
              alignContent="flex-start"
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
            alignItems="flex-start"
            alignContent="flex-start"
            spacing={2}>
            <Grid item xs>
              <Grid item container spacing={2} direction="column" justify="flex-end" alignItems="flex-start" >
                <div className = "Dealer">
                  <Grid item xs={12} m={4} md={4}>
                    <Hand hand = {this.state.communityCards} flex-grow = {4}> </Hand>
                  </Grid>
                </div>
                <div className = "CenterTable">
                  <Grid item xs={12} m={4} md={4}>
                    <Hand hand={this.state.self} flex-grow = {4}> </Hand>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className = "controls">
          <Grid item container direction="row" alignItems="center" justify="center" alignContent="center" spacing={2} xs>
            <Grid item xs={5}><TextField type = "number" ref = {this.BetNUmber} fullWidth onChange ={(e)=>{this.handleChange(e)}}/></Grid>
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
          <Button size="medium" color="primary" onClick={() => this.handleNotYourTurn()}>
            Test Functions
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
                {"You have won " + this.state.potTotal + "!" }
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
                {"Better luck next time!"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.handleLoseClose()  }} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.notYourTurnOpen}
            onClose={() => { this.handleNotYourTurnClose() }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"It is not your turn!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {"Please wait patiently for the prompt to play!"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.handleNotYourTurnClose()  }} color="primary">
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
