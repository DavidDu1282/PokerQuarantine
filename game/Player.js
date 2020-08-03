class Player {
  constructor(data) {
    this.username = data.username;
    this.chips = data.balance;
    this.table = null;

    this.hand = [];
    this.bet = 0; //current amount player is wagering

    this.actionTaken = false; //perform action for the round (call/check/raise)
    this.folded = false; // out for the game
  }

  reset() {
    this.hand = [];
    this.bet = 0;
    this.actionTaken = false;
    this.folded = false;
  }

  /**
   *call, match player's bet to highest bet.
   *check, if highest bet is 0, do nothing
   */
  callOrCheck() {
    this.actionTaken = true;
    var diff = this.table.getHighestBet() - this.bet;
    if (diff > 0) {
      this.addBet(diff);
      console.log("Player " + this.username + " CALL " + diff);
    } else {
      console.log("Player " + this.username + " CHECK ");
    }
    this.table.incrementPlayerTurn();
    this.table.checkForNextRound();
  }
  /**
   * Raise bet
   */
  raise(amount) {
    this.actionTaken = true;
    var diff = this.table.getHighestBet() - this.bet;
    this.addBet(diff + amount);
    console.log("Player " + this.username + " RAISE : " + (diff + amount));

    this.table.requestPlayerActions();
    this.table.incrementPlayerTurn();
    this.table.checkForNextRound();
  }

  fold() {
    console.log("Player " + this.username + " FOLD ");
    this.folded = true;
    this.table.incrementPlayerTurn();
    this.table.checkForNextRound();
  }
  /**
   * transfer player's chips to bet
   */
  addBet(amount) {
    if (this.chips < amount) {
      return "error: not enough chips";
    }
    this.chips -= amount;
    this.bet += amount;
  }

  /**
   * Transfer pot to player's chip
   */
  getWinnings(pot) {
    this.chips += pot;
  }
  
}
module.exports = Player;
