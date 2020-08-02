module.exports = function(io, client) {
  /**
   * Global socket thats connected once any visitor visits the website
   */

  io.on('connect', (socket) => {
    io.emit('message', `${socket.id} is now connected.`)

    // events
    socket.on('ping', () => {
      // a function to allow client to test if the server is working
      // emits a 'pong' event
      
      socket.emit('pong');
    });

    socket.on('disconnect', () => {
      io.emit('message', `${socket.id} disconnected.`);
    })
    
  });

};