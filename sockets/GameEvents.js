module.exports = function (io, client, pool) {
  /**
   * Game events
   */

  /**
   * emit functions
   */
  function get_game_status(pool, gameId) {
    pool.emit("get_current_status", pool.processes[gameId].userIds, {
      turnPosition: pool.processes[gameId].turnPos,
      round: pool.processes[gameId].roundState,
      communityCards: pool.processes[gameId].communityCards,
      pot: pool.processes[gameId].pot,
      turnPosition: pool.processes[gameId].turnPosition,
      foldedPlayers: pool.processes[gameId].foldedPlayers,
      currentBet: pool.processes[gameId].bet,
    });
  }

  io.on("connect", function (socket) {
    socket.on("match", () => {
      /**
       * Get socket on match queue
       */

      client.get(socket.id, (error, userId) => {
        console.log(userId);
        if (pool.queue(userId)) {
          // create new game session, emit session

          let gameId = pool.newGame();
          let players = pool.processes[gameId].userIds;

          pool.emit("match", players, {
            id: gameId,
            players: players,
          });
        }
      });
    });

    socket.on("unmatch", (userId) => {
      /**
       * Remove socket from match queue
       */

      if (userId) {
        try {
          pool.unqueue(userId);
        } catch (e) {}
      } else {
        client.get(socket.id, (error, userId) => {
          try {
            pool.unqueue(userId);
          } catch (e) {}
        });
      }
    });

    socket.on("game_leave", (userId) => {
      /**
       * Disband game
       */

      client.get(`${userId}_game`, (error, gameId) => {
        pool.emit("leave_lobby", pool.processes[gameId].userIds, {});
        pool.terminate(gameId);
      });
    });

    socket.on("game_start", (userId) => {
      /**
       * Start game
       */

      client.get(`${userId}_game`, (error, gameId) => {
        pool.start(gameId);

        var playerPos = pool.processes[gameId].userIds.indexOf(userId);

        pool.emit("get_table", [userId], {
          playerIds: pool.processes[gameId].userIds,
          turnPosition: pool.processes[gameId].turnPos,
          dealersPosition: pool.processes[gameId].dealerPos,
          playerPosition: pool.processes[gameId].userIds.indexOf(userId),
          playersHand: pool.processes[gameId].playersHands,
          pot: pool.processes[gameId].pot,
          bet: pool.processes[gameId].bet,
          communityCards: pool.processes[gameId].communityCards,
          folded: pool.processes[gameId].players[playerPos].folded,
          chips: pool.processes[gameId].players[playerPos].chips,
        });
      });
    });

    socket.on("fold", (userId) => {
      client.get(`${userId}_game`, (error, gameId) => {
        pool.receive("fold", gameId);

        get_game_status(pool, gameId);
      });
    });
    socket.on("raise", (userId, amount) => {
      client.get(`${userId}_game`, (error, gameId) => {
        pool.receive("raise", gameId, amount);

        get_game_status(pool, gameId);
      });
    });
    socket.on("checkOrCall", (userId) => {
      client.get(`${userId}_game`, (error, gameId) => {
        pool.receive("checkOrCall", gameId);

        get_game_status(pool, gameId);
      });
    });

    socket.on("disconnect", () => {
      client.get(socket.id, (error, userId) => {
        if (userId != null) {
          try {
            pool.unqueue(userId);
          } catch (e) {}

          client.get(`${userId}_game`, (error, gameId) => {
            if (gameId) pool.terminate(gameId);
          });

          client.del(socket.id);
          client.del(userId);
        }
      });
    });
  });
};
