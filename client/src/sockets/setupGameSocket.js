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
  })

  socket.on("get_table",(tableData)=>{
    if(process.env.NODE_ENV === "development"){
      console.log("Received get_table!");
    }

    var topTableData = {};
    var rightTableData = {};
    var centerTableData = {};
    var leftTableData = {};
    var playerData = {};
    tableData.userIds.map((elem, index )=> {
      var temp = {
        playerName:"Left",
        playerID:2,
        chipAmount:0,
        playerPosition:0,
        userStatusString:'',
        cardArray:[
          {
            cardID:'1c',
            cardHidden:true,
          },
          {
            cardID:'2c',
            cardHidden:false,
          }
        ],

        cardSum: 0,
        betAmount: 0,
        folded: false,
      };
      if (index<3){
        temp.playerID = elem;
        //temp.playerPos = tableData.playerPosition;
        tableData.playersHand[elem].map((elem1, index1)=>{
          temp.cardArray[index1].cardID = elem1;
          if(index === tableData.dealersPosition){
            temp.userStatusString = '(Dealer)';
          }
          else if(index === (tableData.dealersPosition+1)){
            temp.userStatusString = '(SmallBet)';
          }
          else if(index === (tableData.dealersPosition+1)){
            temp.userStatusString = '(BigBet)';
          }
          temp.chipAmount = tableData.chips;
          if(client.user.id === elem){
            temp.cardHidden = false;
            client.TexasHoldemGamePage.setState(((state) => {return {
              self: temp,
            }}));
          }
        }

        )
        topTableData.push(temp)
      }
      else if (index<6){
        temp.playerID = elem;
        //temp.playerPos = tableData.playerPosition;
        tableData.playersHand[elem].map((elem1, index)=>{
          temp.cardArray[index].cardID = elem1;
          if(index === tableData.dealersPosition){
            temp.userStatusString = '(Dealer)';
          }
          else if(index === (tableData.dealersPosition+1)){
            temp.userStatusString = '(SmallBet)';
          }
          else if(index === (tableData.dealersPosition+1)){
            temp.userStatusString = '(BigBet)';
          }
          temp.chipAmount = tableData.chips;
          if(client.user.id === elem){
            temp.cardHidden = false;
            client.TexasHoldemGamePage.setState(((state) => {return {
              self: temp,
            }}));
          }
        }

        )
        rightTableData.push(temp)
      }
      else if(index<7){
        temp.playerID = elem;
        //temp.playerPos = tableData.playerPosition;
        tableData.playersHand[elem].map((elem1, index1)=>{
          temp.cardArray[index1].cardID = elem1;
          if(index === tableData.dealersPosition){
            temp.userStatusString = '(Dealer)';
          }
          else if(index === (tableData.dealersPosition+1)){
            temp.userStatusString = '(SmallBet)';
          }
          else if(index === (tableData.dealersPosition+1)){
            temp.userStatusString = '(BigBet)';
          }
          temp.chipAmount = tableData.chips;
          if(client.user.id === elem){
            temp.cardHidden = false;
            client.TexasHoldemGamePage.setState(((state) => {return {
              self: temp,
            }}));
          }
        }

        )
        centerTableData.push(temp);
      }
      else{
        temp.playerID = elem;
        //temp.playerPos = tableData.playerPosition;
        tableData.playersHand[elem].map((elem1, index1)=>{
          temp.cardArray[index1].cardID = elem1;
          if(index === tableData.dealersPosition){
            temp.userStatusString = '(Dealer)';
          }
          else if(index === (tableData.dealersPosition+1)){
            temp.userStatusString = '(SmallBet)';
          }
          else if(index === (tableData.dealersPosition+1)){
            temp.userStatusString = '(BigBet)';
          }
          temp.chipAmount = tableData.chips;
          if(client.user.id === elem){
            temp.cardHidden = false;
            client.TexasHoldemGamePage.setState(((state) => {return {
              self: temp,
            }}));
          }
        }

        )
        leftTableData.push(temp);
      }
    })
    /*
          playerIds: pool.processes[gameId].userIds,
          turnPosition: pool.processes[gameId].turnPos,
          dealersPosition: pool.processes[gameId].dealerPos,
          playerPosition: pool.processes[gameId].userIds.indexOf(userId),
          playersHand: pool.processes[gameId].playersHands,
          pot: pool.processes[gameId].pot,
          bet: pool.processes[gameId].bet,
          communityCards: pool.processes[gameId].communityCards,
          folded: pool.processes[gameId].players[playerPos].folded,
          chips: pool.processes[gameId].players[playerPos].chips,
    */
    var temp1=[
      {
        playerName:"Community Cards",
        //playerID:0,
        chipAmount:0,
        playerPosition:0,
        cardArray:[
          {
            cardID:tableData.communityCards[0],
            cardHidden:false,
          },
          {
            cardID:tableData.communityCards[1],
            cardHidden:false,
          },
          {
            cardID:tableData.communityCards[2],
            cardHidden:false,
          },
        ],
        betAmount: 0,
      },
    ]
    client.TexasHoldemGamePage.setState(((state) => {return {
      selfPosition: tableData.playerPosition,
      dealersPosition: tableData.dealersPosition,
      potTotal: tableData.pot,
      turnPosition: tableData.turnPosition,
      TopTable: topTableData,
      RightTable: rightTableData,
      communityCards: temp1,
      CenterTable: centerTableData,
      LeftTable: leftTableData,
    }}));

  })
  socket.on('get_game_status',(updateData)=>{
      if(process.env.NODE_ENV === "development"){
        console.log("Received get_game_status!");
      }
      var newBet = 0;
      if(client.TexasHoldemGamePage.state.round === updateData.round){
        newBet = updateData.pot - this.client.TexasHoldemGamePage.state.potTotal;
      }
      else{
        client.TexasHoldemGamePage.setState(((state) => {return {round: updateData.round}}));
      }
      client.TexasHoldemGamePage.setState(((state) => {return {
        lastPlayerBetAmount: newBet,
        turnPosition: updateData.turnPos
      }}));
      if(updateData.turnPos === client.TexasHoldemGamePage.state.playerPosition){
        client.TexasHoldemGamePage.handleOpen();
      }
      /*
      this.client.TexasHoldemGamePage.state.LeftTable.map(elem => (
        if(elem.playerID = updateDataplayerID)
      ))
      */
  })

  socket.on('endOfGame',(playerInfo)=>{
    if(process.env.NODE_ENV === "development"){
      console.log("Received endOfGame!");
    }
    if(client.user.id === playerInfo.winner){
      client.TexasHoldemGamePage.handleWin();
    }
    else{
      client.TexasHoldemGamePage.handleLose();
    }
  })

}
