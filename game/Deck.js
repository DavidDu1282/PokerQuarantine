const _ = require("lodash");
class Deck {
  constructor() {
    this.deck = [];
    this.generateDeck();
    this.shuffle();
  }
  generateDeck() {
    var tmpDeck = [];
    var suit = ["d", "c", "h", "s"];
    var rank = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "T",
      "J",
      "Q",
      "K",
      "A",
    ];
    var tmpCard = undefined;
    for (var i = 0; i < rank.length; i++) {
      for (var j = 0; j < suit.length; j++) {
        tmpCard = rank[i] + suit[j];

        this.deck.push(tmpCard);
      }
    }
  }
  shuffle() {
    this.deck = _.shuffle(this.deck);
  }
  drawCard() {
    let card = this.deck.shift();
    return card;
  }
  reset() {
    this.deck = [];
    this.generateDeck();
    this.shuffle();
  }
}

// deck = new Deck();

// console.log(deck);
// var draw = deck.drawCard();
// console.log(draw);
// console.log(deck.deck.length);

// deck.shuffle();
// var draw1 = deck.drawCard();
// console.log(draw1);
// console.log(deck.deck);

module.exports = Deck;
