module.exports = function(io, client) {
  /**
   * User socket that contains user specific events such as friends and chatting
   */


  io.on('connect', function(socket) {

    socket.on('user-handshake', (userId) => {
      /**
       * Get user id from client
       * --------------------
       * data: {string} userId
       */

      io.emit('message', `${socket.id} is associated with userId: ${userId}`)

      // check if duplicate login 

      client.get(userId, (error, sessionId) => {
        if (sessionId != null) {
          // logs out the user
          
          socket.broadcast.to(sessionId).emit('duplicate-session');

          client.del(sessionId);
          client.del(userId);
        }
      });

      // cache user to redis

      client.set(socket.id, userId);
      client.set(userId, socket.id); // insufficient use of memory i know
    });

    socket.on('chat', (msg) => {
      /**
       * Get user id from client
       * --------------------
       * data: {chat} {user: user, msg, time}
       */

      socket.broadcast('chat', msg);
    })


    socket.on('user-logout', (userId) => {
      /**
       * Remove user from cache
       * --------------------
       * data: {string} userId
       */

      client.del(socket.id);
      client.del(userId);
    });
  });

  

};
