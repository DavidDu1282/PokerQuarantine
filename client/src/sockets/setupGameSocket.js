import { AlternateEmail } from "@material-ui/icons";

export default function setupGameSocket(socket, client) {
  socket.on("match", (game) => {
    /**
     * Matched into a room, set room to display
     */

    client.in_game = true;
    client.matching = false;
    client.windowController.current.hide("Match");
    client.windowController.current.show("Lobby");

    // init lobby(game)
    setTimeout(() => {
      client.lobby.current.reset();
      client.lobby.current.setId(game.id);
      client.lobby.current.addPlayers(game.players);
    }, 1000);
  });

  socket.on("game_terminate", (reason) => {
    if (client.lobby.current) client.lobby.current.reset();
    client.windowController.current.hide("Lobby");

    if (reason && client.in_game) alert(reason);
  });
}
