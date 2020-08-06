const { v4: uuidv4 } = require("uuid");
var Table = require("./Table");

function eventMapper(game) {
  // map events to corresponding function

  return {
    action: game.action,
    fold: game.getCurrentPlayer().fold,
    addBet: game.getCurrentPlayer().raise,
    checkOrCall: game.getCurrentPlayer().checkOrCall,
  };
}

class GamePool {
  /**
   * Controller that allows multiple games to co-exist
   * ----------------
   * @param { io } io
   * @param { redisClient } client
   */

  constructor(io, client) {
    this.io = io;
    this.client = client;
    this.processes = {}; // holds a collection of game processes by id

    this.matchQueue = []; // match queue
    this.minPlayer = 3;
  }

  queue(playerId) {
    this.matchQueue.push(playerId);

    if (this.matchQueue.length >= this.minPlayer) {
      return true;
    }
    return false;
  }

  unqueue(playerId) {
    const index = this.matchQueue.indexOf(playerId);

    if (index == -1) throw new Error("player not in queue");

    this.matchQueue.splice(index, 1);
  }

  newGame() {
    // create a new game with players in quese, return id

    if (this.matchQueue.length < this.minPlayer)
      throw new Error("not enough players");

    let currentQueue = this.matchQueue.slice();
    this.matchQueue = []; // reset queue

    const id = uuidv4();
    this.processes[id] = new Table(id, currentQueue, this);

    if (process.env.NODE_ENV !== "test") {
      currentQueue.map((player) => {
        this.client.set(`${player}_game`, id);
      });
    }

    return id;
  }

  emit(event, players, data) {
    // emit data to targeted players in game
    players.map((player) => {
      this.client.get(player, (error, socketId) => {
        this.io.to(socketId).emit(event, data);
      });
    });
  }

  receive(event, id, data) {
    // map events revceived by socket io
    const game = this.processes[id];
    if (game == null) throw new Error("no game with such id");

    const map = eventMapper(game);
    return map[event](data);
  }

  start(id) {
    // start given game by id
    const game = this.processes[id];
    game.start();
  }
  terminate(id) {
    // close a given game by id, return its status

    const game = this.processes[id];
    if (game == null) throw new Error("no game with such id");

    const result = game.gameStatus;
    if (process.env.NODE_ENV !== "test") {
      game.players.map((player) => {
        this.client.del(`${player}_game`);
      });

      this.emit(
        "game_terminate",
        game.players,
        "Game has been terminated because one of the player has left the game."
      );
    }
    delete this.processes[id];

    return result;
  }
}

class Game {
  /**
   * Dummy Game for testing
   */

  constructor(id, players, pool) {
    this.id = id;
    this.players = players;
    this.pool = pool;
  }

  get gameStatus() {
    return true;
  }

  action() {
    return "action() called";
  }

  addPlayer(playerId) {
    this.players.push(playerId);
  }

  deletePlayer(playerId) {
    const index = this.players.indexOf(playerId);
    if (index == -1) throw new Error("player not in game");

    this.players.splice(index, 1);
  }
}

module.exports = GamePool;
