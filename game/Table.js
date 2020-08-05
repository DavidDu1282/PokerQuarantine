var Deck = require("./Deck.js");
var Player = require("./Player.js");
var PokerEvaluator = require("poker-evaluator");
const mongoose = require("mongoose");
const User = mongoose.model("users");

class Table {
  constructor(id, userIds, pool, smallBlind = 100) {
    this.id = id;
    this.pool = pool;
    this.userIds = userIds;
    this.pot = 0;
    this.bet = 0;
    this.players = [];
    this.playersHands = {};
    this.roundState = "idle";
    this.communityCards = [];
    this.deck = new Deck();

    this.dealerPos = 0; //"dealer button" indicates which player is dealer for current game
    this.smallBlind = smallBlind; //the player clockwise next to dealer is "small blind" and is force make first bet
    this.bigBlind = this.smallBlind * 2; //player clockwise next to small blind is big blind, typically twice the size of small blinds

    this.turnPos = 0;
    this.winner = undefined;
    this.addPlayers();
    console.log(this.pool);
  }

  async addPlayers() {
    for (var i = 0; i < this.userIds.length; i++) {
      var data = await User.findOne({ userId: this.userIds[i] }).exec();
      var newPlayer = new Player(data);

      newPlayer.table = this;
      this.players.push(newPlayer);
    }
  }

  reset() {
    this.bet = 0;
    this.pot = 0;
    this.playersHands = {};

    this.roundState = "idle";
    this.communityCards = [];
    this.deck = new Deck();

    this.dealerPos = this.dealerPos; //"dealer button" indicates which player is dealer for current game
    this.smallBlind = this.smallBlind; //the player clockwise next to dealer is "small blind" and is force make first bet
    this.bigBlind = this.smallBlind * 2; //player clockwise next to small blind is big blind, typically twice the size of small blinds

    this.turnPos = 0;
    this.winner = undefined;

    for (var i = 0; i < this.players.length; i++) {
      this.players[i].reset();
    }
  }

  /**
   * flow control for table's round
   */

  nextRound() {
    if (this.roundState === "deal") {
      this.gatherBets();

      this.flop();
      this.pool.emit("get_game_status", this.userIds, {
        round: this.roundState,
        communityCards: this.communityCards,
        pot: this.pot,
      });
    } else if (this.roundState === "flop") {
      this.gatherBets();
      this.turn();
      this.pool.emit("get_game_status", this.userIds, {
        round: this.roundState,
        communityCards: this.communityCards,
        pot: this.pot,
        turnPosition: this.turnPos,
      });
    } else if (this.roundState === "turn") {
      this.gatherBets();
      this.river();
      this.pool.emit("get_game_status", this.userIds, {
        round: this.roundState,
        communityCards: this.communityCards,
        pot: this.pot,
        turnPosition: this.turnPos,
      });
    } else if (this.roundState === "river") {
      this.gatherBets();

      this.showdown();
      this.pool.emit("get_game_status", this.userIds, {
        round: this.roundState,
        communityCards: this.communityCards,
        pot: this.pot,
        turnPosition: this.turnPos,
      });
    } else if (this.roundState === "showdown") {
      this.pool.emit("endOfGame", this.userIds, {
        winner: this.winner,
      });
      this.endRound();
    }
  }
  /**
   * Players check for next round after each action they perform (ie callOrCheck, Raise, Fold)
   */
  checkForNextRound() {
    if (this.isEndRound()) {
      this.nextRound();
    }
  }

  /**
   * check if round is over
   * round is over when all active players made a move
   * return boolean
   */
  isEndRound() {
    var roundEnded = true;
    for (var i = 0; i < this.players.length; i++) {
      if (!this.players[i].actionTaken && !this.players[i].folded) {
        roundEnded = false;
      }
    }
    return roundEnded;
  }

  start() {
    this.reset();
    console.log("************** STARTING GAME **************");
    //determine dealer, small blind, big blind
    console.log(
      "Player " + this.players[this.dealerPos].username + " is the dealer"
    );
    var smallBlindPos = (this.dealerPos + 1) % this.players.length;
    var bigBlindPos = (this.dealerPos + 2) % this.players.length;

    //small and big pay blind
    this.players[smallBlindPos].addBet(this.smallBlind);
    this.players[bigBlindPos].addBet(this.bigBlind);
    this.bet = this.bigBlind;

    //deal cards to players
    for (var i = 0; i < this.players.length; i++) {
      var c1 = this.deck.drawCard();
      var c2 = this.deck.drawCard();
      this.players[i].hand.push(c1, c2);
      console.log(
        "Player " + this.players[i].username + " get cards " + c1 + " & " + c2
      );

      this.playersHands[this.players[i].userId] = [c1, c2];
    }

    //determine whose turn it is now
    this.turnPos = (bigBlindPos + 1) % this.players.length;
    console.log(
      "Now it is player " + this.players[this.turnPos].username + "turn"
    );
    this.roundState = "deal";
    this.pool.emit("get_game_status", this.userIds, {
      round: this.roundState,
      communityCards: this.communityCards,
      pot: this.pot,
      bet: this.bet,
      turnPosition: this.turnPos,
    });
    console.log("************** Round Deal **************");
  }

  flop() {
    console.log("************** Round Flop  **************");
    this.roundState = "flop";

    //draw three cards to community cards
    this.communityCards.push(
      this.deck.drawCard(),
      this.deck.drawCard(),
      this.deck.drawCard()
    );
    console.log(
      "Community cards: " +
        this.communityCards[0] +
        ", " +
        this.communityCards[1] +
        ", " +
        this.communityCards[2]
    );
    //begin player actions
    this.requestPlayerActions();
  }

  turn() {
    console.log("************** Round Turn  **************");
    this.roundState = "turn";
    //draw the fourth card to community cards
    this.communityCards.push(this.deck.drawCard());
    console.log(
      "Community cards: " +
        this.communityCards[0] +
        ", " +
        this.communityCards[1] +
        ", " +
        this.communityCards[2] +
        ", " +
        this.communityCards[3]
    );
    //begin player actions
    this.requestPlayerActions();
  }

  river() {
    console.log("************** Round River  **************");
    this.roundState = "river";
    //draw the 5th card
    this.communityCards.push(this.deck.drawCard());
    console.log(
      "Community cards: " +
        this.communityCards[0] +
        ", " +
        this.communityCards[1] +
        ", " +
        this.communityCards[2] +
        ", " +
        this.communityCards[3] +
        ", " +
        this.communityCards[4]
    );

    this.requestPlayerActions();
  }

  showdown() {
    console.log("************** Round Showdown  **************");
    this.roundState = "showdown";

    //gather all hands from active players and evaluate
    var evalHands = {};
    for (var i = 0; i < this.players.length; i++) {
      if (!this.players[i].folded) {
        evalHands[i] = PokerEvaluator.evalHand(
          this.communityCards.concat(this.players[i].hand)
        );
      }
    }
    //get highest value and index
    var highestValue = -999999;
    var highestIndex = undefined;
    for (let [key, evalHand] of Object.entries(evalHands)) {
      if (highestValue < evalHand.value) {
        highestValue = evalHand.value;
        highestIndex = key;
      }
    }

    console.log(
      "Community cards : " +
        this.communityCards[0] +
        ", " +
        this.communityCards[1] +
        ", " +
        this.communityCards[2] +
        ", " +
        this.communityCards[3] +
        ", " +
        this.communityCards[4]
    );

    console.log(
      "Player " +
        this.players[highestIndex].username +
        " : " +
        this.players[highestIndex].hand +
        " |" +
        " wins with " +
        evalHands[highestIndex].handName
    );
    //Distribute the pot to winner
    this.winner = this.players[highestIndex].userId;
    this.players[highestIndex].getWinnings(this.pot);
    this.pot = 0;

    this.nextRound();
  }

  /**
   * prepare for next game
   * update dealer's position
   *
   */
  endRound() {
    console.log("************** Game Ended  **************");
    this.roundState = "endround";
    this.dealerPos = (this.dealerPos + 1) % this.players.length;
  }

  incrementPlayerTurn() {
    do {
      this.turnPos = (this.turnPos + 1) % this.players.length;
    } while (this.players[this.turnPos].folded); //skip inactive players
  }
  /**
   * collect bets from all players
   */
  gatherBets() {
    for (var i = 0; i < this.players.length; i++) {
      this.pot += this.players[i].bet;
      this.players[i].bet = 0;
    }
    this.bet = 0;
    console.log("total pot: " + this.pot);
  }

  getCurrentPlayer() {
    return this.players[this.turnPos];
  }
  /**
   * Set all active player's actionTaken to false
   */
  requestPlayerActions() {
    for (var i = 0; i < this.players.length; i++) {
      if (!this.players[i].folded) {
        this.players[i].actionTaken = false;
      }
    }
  }

  /**
   * Get the highest bet from all players
   */
  getHighestBet() {
    var highestBet = -999;
    for (var i = 0; i < this.players.length; i++) {
      if (highestBet < this.players[i].bet) {
        highestBet = this.players[i].bet;
      }
    }
    this.bet = highestBet;
    return highestBet;
  }
}

module.exports = Table;

// var game = new Table();
// var player1 = new Player({ username: "DayTime", balance: 40000 });
// var player2 = new Player({ username: "Luna", balance: 50000 });
// var player3 = new Player({ username: "MidNight", balance: 50000 });

// game.addPlayer(player1);
// game.addPlayer(player2);
// game.addPlayer(player3);

// game.start();
// game.getCurrentPlayer().callOrCheck(); //1
// game.getCurrentPlayer().callOrCheck(); //2
// game.getCurrentPlayer().raise(2000); //3
// game.getCurrentPlayer().raise(2000); //1
// game.getCurrentPlayer().fold(); //2
// game.getCurrentPlayer().callOrCheck(); //3
// game.getCurrentPlayer().callOrCheck(); //1
// game.getCurrentPlayer().raise(1000); //3
// game.getCurrentPlayer().callOrCheck(); //1
// game.getCurrentPlayer().callOrCheck(); //3
// game.getCurrentPlayer().raise(3000); //1
// game.getCurrentPlayer().callOrCheck(); //3
// game.getCurrentPlayer().callOrCheck(); //1
// game.getCurrentPlayer().callOrCheck(); //3
// game.getCurrentPlayer().callOrCheck(); //1

// game.start();
/*

Texas Hold'em Rules
The blind
    -"dealer button" indicates which player is dealer for current game
        -before game starts, the player clockwise next to dealer is "small blind" and is force make first bet
            - player clockwise next to small blind is big blind, typically twice the size of small blinds, blinds can vary depending on stakes and betting structure 
                - limit games, small blind = $1, big blind = $2
                    - $15/$30, $10/$15
           
        -players then receive two hole cards 
        -actions proceed clockwise around the table starting from the player "under the gun", clockwise from big blind 
        
Player actions:
    -fold, check, bet, call, raise, options are availble based on previous player action
    -if nobody made bet, then player can either check or bet
    -if previous player bet, then player can fold, call, or raise
        -check is to decline to bet but keep cards
        -bet, increase wager, other players will have to call or raise 
        -call is to match the amount previous player has bet 
        -raise, not only match the previous bet but also incease it

Rounds:
    -deal
        -after the two cards has been dealt to the players, it is player next to big blind turn, have the option to fold, call, or raise the big blind
        -betting continues until all active players have placed equal bets in the pot
    -the flop
        -three cards are dealt to the community cards
        -betting on flop begins with active player clockwise from the button
        -actions are similar to pre-flop
            - if nobody has previously bet, players can opt to check, passing the action to next active player

    -the turn 
        - 4th card is dealt to the community card 
        -it is active player clockwise to button turn
    
    -the river 
        - the 5th card is dealt to the community card
         -it is active player clockwise to button turn
    - the showdown
        -if there is more than one remaining player remain, the last person to bet or raise shows card, unless there was no bet then the player clockwise to button shows.
        -player with the best hand wins the pot
        -if there is identical hands then the pot is split evenly
        -in texas holdem, all suit are equal

    -If the betting causes all but one player to fold, the lone remaining player wins the pot without having to show any cards.


*/
