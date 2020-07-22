module.exports = function(io) {
  /**
   * User socket that contains user specific events such as friends and chatting
   */
  io.on('connect', (socket) => {

    socket.on('user-handshake', (data) => {
      /**
       * Get user id from client
       * --------------------
       * data: {string} userId
       */

      io.emit('message', `${socket.id} is associated with userId: ${data}`)

    });
  });

};