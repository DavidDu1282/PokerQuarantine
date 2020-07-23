module.exports = function(io, client) {
  /**
   * User socket that contains user specific events such as friends and chatting
   */


  io.on('connect', function(socket) {

    socket.on('user-handshake', async (userId) => {
      /**
       * Get user id from client
       * --------------------
       * data: {string} userId
       */

      io.emit('message', `${socket.id} is associated with userId: ${userId}`)

      // cache user to redis

      await client.set(socket.id, userId, 'EX', 3600); // cache for 1hr
      await client.set(userId, socket.id, 'EX', 3600); // insufficient use of memory i know
    });

    socket.on('user-logout', async (userId) => {
      /**
       * Remove user from cache
       * --------------------
       * data: {string} userId
       */

      await client.del(socket.id);
      await client.del(userId);
    })
  });

  

};