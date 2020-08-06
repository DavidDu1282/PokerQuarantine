module.exports = function (io, client, pool) {
  /**
   * socket functions
   */
  function emit_game_status(pool, gameId) {
    pool.emit("get_game_status", pool.processes[gameId].userIds, {
      turnPosition: pool.processes[gameId].turnPos,
      round: pool.processes[gameId].roundState,
      communityCards: pool.processes[gameId].communityCards,
      pot: pool.processes[gameId].pot,

      foldedPlayers: pool.processes[gameId].foldedPlayers,
      bet: pool.processes[gameId].bet,
    });
  }

  /**
   * Game events
   */

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

        pool.emit("load_game", pool.processes[gameId].userIds, {});
      });
    });

    socket.on("fold", (userId) => {
      client.get(`${userId}_game`, (error, gameId) => {
        pool.receive("fold", gameId);

        emit_game_status(pool, gameId);
      });
    });
    socket.on("raise", (userId, amount) => {
      client.get(`${userId}_game`, (error, gameId) => {
        pool.receive("raise", gameId, amount);

        emit_game_status(pool, gameId);
      });
    });
    socket.on("checkOrCall", (userId) => {
      client.get(`${userId}_game`, (error, gameId) => {
        pool.receive("checkOrCall", gameId);

        emit_game_status(pool, gameId);
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
