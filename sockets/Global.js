module.exports = function(io) {
  /**
   * Global socket thats connected once any visitor visits the website
   */

  io.on('connect', (socket) => {
    io.emit('message', `${socket.id} is now connected.`)

    // import additional modules
    require('./UserEvents')(io);

    socket.on('disconnect', () => {
      io.emit('message', `${socket.id} disconnected.`)
    })
  });

};