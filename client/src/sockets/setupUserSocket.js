export default function setupUserSocket(socket, client) {
  socket.on('user-handshake', (event, ...args) => {
    /**
     * Server requesting a rehandshake due to cache expiering
     * re-handshake with user data and emit the event again
     */

    socket.emit('user-handshake', client.user.id);
    socket.emit(event, ...args);
  });

  socket.on('chat', (msg) => {
    /**
     * Render the recieved msg on screen
     */

    client.chatPanel.current.insertChat(
      msg.text, msg.user, msg.date
    );
  })

  socket.on('duplicate-session', async () => {
    /**
     * Server detects a duplicate login and request this client to logout
     */

    await client.logout(false);
    alert('You have been logged out due to another login to your account at a different machine (Or browser tab).')
  });
}