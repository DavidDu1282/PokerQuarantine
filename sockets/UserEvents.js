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
          io.to(sessionId).emit('duplicate-session');
          io.emit('message', `${userId} with session ${sessionId} has been bumped due to duplicate login`)

          client.del(sessionId);
        } 
        // cache user to redis

        client.set(socket.id, userId);
        client.set(userId, socket.id); // insufficient use of memory i know
      });
    });

    socket.on('chat', (msg) => {
      /**
       * Get user id from client
       * --------------------
       * data: {chat} {user: user, msg, time}
       */

      socket.broadcast.emit('chat', msg);
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
