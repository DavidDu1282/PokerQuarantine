process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const GamePool = require('../../game/GamePool');

describe('GamePool', function (done) {
  before(function (done) {
    this.pool = new GamePool();
    done();
  });

  it('creates new game', function (done) {
    this.gameIds = Array(10).fill().map((_, i) => {
      this.pool.matchQueue = [1, 1];
      return this.pool.newGame();
    });

    for (gameId of this.gameIds) {
      let game = this.pool.processes[gameId];
      expect(game).to.be.not.null;
      expect(game.players).to.have.length(2);
    };

    done();
  });

  it('emits recieved events', function (done) {

    for (gameId of this.gameIds) {
      let result = this.pool.receive('action', gameId);
      expect(result).to.equal('action() called');
    };

    done();
  });

  it('deltes game correctly', function (done) {

    for (gameId of this.gameIds) {
      let result = this.pool.terminate(gameId);
      expect(result).to.equal(true);
      expect(this.pool[gameId]).to.be.undefined;
    };

    done();
  });

});
