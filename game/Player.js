class Player {
  constructor(data) {
    this.userId = data.userId;
    this.username = data.name;
    this.chips = data.balance;
    this.avatarURL = data.avatar_url;

    this.table = null;

    this.hand = [];
    this.bet = 0; //current amount player is wagering

    this.actionTaken = false; //performed action for the round (call/check/raise)
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
    this.table.bet = diff + amount;
    this.addBet(diff + amount);
    console.log("Player " + this.username + " RAISE : " + (diff + amount));

    this.table.requestPlayerActions();
    this.table.incrementPlayerTurn();
    this.table.checkForNextRound();
  }

  fold() {
    console.log("Player " + this.username + " FOLD ");
    this.folded = true;
    this.table.foldedPlayers.push(this.userId);
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
