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

  socket.on("load_game", () => {
    client.windowController.current.hide("Lobby");
    client.windowController.current.show("TexasHoldemGamePage");
  });

  socket.on("game_terminate", (reason) => {
    if (client.lobby.current) client.lobby.current.reset();
    client.windowController.current.hide("Lobby");
    client.windowController.current.hide("TexasHoldemGamePage");
    client.in_game = false;
    
    if (reason && client.in_game) alert(reason);
  });

  socket.on("get_table", (tableData) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Received get_table!");
      console.log(tableData);
    }

    client.TexasHoldemGamePage.current.get_table(tableData);


  });
  // socket.on("get_current_status", (updateData) => {
  //   if (process.env.NODE_ENV === "development") {
  //     console.log("Received get_game_status!");
  //     console.log(updateData);
  //   }
  //   var newBet = 0;
  //   if (client.TexasHoldemGamePage.current.state.round === updateData.round) {
  //     newBet = updateData.pot - this.client.TexasHoldemGamePage.current.state.potTotal;
  //   } else {
  //     client.TexasHoldemGamePage.current.setState((state) => {
  //       return { round: updateData.round };
  //     });
  //   }
  //   client.TexasHoldemGamePage.current.setState((state) => {
  //     return {
  //       lastPlayerBetAmount: newBet,
  //       turnPosition: updateData.turnPos,
  //     };
  //   });
  //   if (
      
  //     updateData.turnPos === client.TexasHoldemGamePage.current.state.selfPosition
  //   ) {
  //     console.log(updateData.turnPos);
  //     console.log(client.TexasHoldemGamePage.current.state.selfPosition);
  //     client.TexasHoldemGamePage.current.handleOpen();
  //   }
  //   /*
  //     this.client.TexasHoldemGamePage.current.state.LeftTable.map(elem => (
  //       if(elem.playerID = updateDataplayerID)
  //     ))
  //     */
  // });
  socket.on("get_game_status", (updateData) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Received get_game_status!");
      console.log(updateData);
    }
    //thisclient.TexasHoldemGamePage.current.setState()
    /*
    cardArray:[
      {
        cardID: tableData.playersHand[user.userId][0],
        cardHidden: hideCards,
       },
      {
        cardID:tableData.playersHand[user.userId][1],
        cardHidden: hideCards,
      }
    ],
    */
   //appending new community cards 
    var newCommunityCards = {
      name: "Community Cards",
      //playerID:0,
      chipAmount:updateData.pot,
      //playerPosition:0,
      cardArray: updateData.communityCards.map((cardId) => {
        return {
          cardID: cardId,
          cardHidden: false,
        }
      }),
      betAmount: updateData.pot,
    }
   client.TexasHoldemGamePage.current.setState((state) => {
    return { communityCards: newCommunityCards };
  });


    var newBet = 0;
    //console.log(updateData.pot);
    

    let left = client.TexasHoldemGamePage.current.state.leftTablePlayers.map(elem => {
      if(elem.playerPosition === client.TexasHoldemGamePage.current.state.turnPosition){
        elem.betAmount = updateData.bet;
        return elem
      } else {
        return elem;
      }
    });
    let right = client.TexasHoldemGamePage.current.state.rightTablePlayers.map(elem => {
      if(elem.playerPosition === client.TexasHoldemGamePage.current.state.turnPosition){
        elem.betAmount = updateData.bet;
        return elem;
      } else {
        return elem;
      }
    });
    
    if (client.TexasHoldemGamePage.current.state.round === updateData.round) {
      newBet = 0
    } else {
      let left = client.TexasHoldemGamePage.current.state.leftTablePlayers.map(elem => {
          elem.betAmount = 0;
          return elem
      });
      let right = client.TexasHoldemGamePage.current.state.rightTablePlayers.map(elem => {
          elem.betAmount = 0;
          return elem
      });
      /*
      client.TexasHoldemGamePage.current.setState((state) => {
        
        return { 
          round: updateData.round 
          leftTablePlayers
        };
      });
      */
    }
    client.TexasHoldemGamePage.current.setState((state) => {
      return {
        leftTablePlayers: left,
        rightTablePlayers: right
      };
    });


    client.TexasHoldemGamePage.current.setState((state) => {
      return {
        lastPlayerBetAmount: updateData.bet,
        turnPosition: updateData.turnPosition,
      };
    });
    if (
      updateData.turnPosition === client.TexasHoldemGamePage.current.state.selfPosition
    ) {
      client.TexasHoldemGamePage.current.handleOpen();
    }
    /*
      this.client.TexasHoldemGamePage.current.state.LeftTable.map(elem => (
        if(elem.playerID = updateDataplayerID)
      ))
      */
  });
  socket.on("endOfGame", (playerInfo) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Received endOfGame!");
    }
    
    if (client.user.id === playerInfo.winner) {
      client.TexasHoldemGamePage.current.handleWin();
    } else {
      client.TexasHoldemGamePage.current.handleLose();
    }
  });
}
