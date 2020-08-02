module.exports = function(io, client, pool) {
  /**
   * Game events
   */

  io.on('connect', function(socket) {
    socket.on('match', () => {
      /**
       * Get socket on match queue
       */

      client.get(socket.id, (error, userId) => {
        if (pool.queue(userId)) {
          // create new game session, emit session

          let gameId = pool.newGame();
          let players = pool.processes[gameId].players;

          pool.emit('match', 
            players,
            {
              id: gameId,
              players: players
          });
          
        }
      });

    });

    socket.on('unmatch', (userId) => {
      /**
       * Remove socket from match queue
       */

       
      if (userId) {
        try { pool.unqueue(userId); } catch (e) {}
      } else {
        client.get(socket.id, (error, userId) => {
          try { pool.unqueue(userId); } catch (e) {}
        });
      }

      
    });

    socket.on('game_leave', (userId) => {
      /**
       * Disband game
       */

      client.get(`${userId}_game`, (error, gameId) => {
        pool.terminate(gameId);
      })
    });


    socket.on('disconnect', () => {
      client.get(socket.id, (error, userId) => {
        if (userId != null) {
          try {
            pool.unqueue(userId);
          } catch (e) {}

          client.get(`${userId}_game`, (error, gameId) => {
            if (gameId) pool.terminate(gameId);
          })

          client.del(socket.id);
          client.del(userId);
        }
      })
    });

  })
}
