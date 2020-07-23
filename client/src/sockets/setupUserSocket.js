export default function setupUserSocket(socket, client) {
  socket.on('user-handshake', (event, ...args) => {
    /**
     * Server requesting a rehandshake due to cache expiering
     * re-handshake with user data and emit the event again
     */

    socket.emit('user-handshake', client.user.id);
    socket.emit(event, ...args);
  });
}