import { AlternateEmail } from "@material-ui/icons";

export default function setupGameSocket(socket, client) {
  socket.on('match', (game) => {
    /**
     * Matched into a room, set room to display
     */

    client.in_game = true;
    client.matching = false;
    client.windowController.current.hide('Match');
    client.windowController.current.show('Lobby');

    // init lobby(game)
    setTimeout(() => {
      client.lobby.current.reset();
      client.lobby.current.setId(game.id);
      client.lobby.current.addPlayers(game.players);
    }, 1000);

  });

  socket.on('game_terminate', (reason) => {
    if (client.lobby.current) client.lobby.current.reset();
    client.windowController.current.hide('Lobby');

    if (reason && client.in_game) alert(reason);
  })
  socket.on("gameStart",(tableData)=>{
    var temp = {
      playerName:"Left",
      playerID:2,
      chipAmount:0,
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
      folded: true,
    };
    var topTableData;
    var rightTableData;
    var centerTableData;
    var leftTableData;
    tableData.playerIDs.map(elem => (
      if(tableData.playerIDs.indexOf(elem)<3){
        temp.playerID = elem;
        tableData.playersHand[elem].map(elem1=>(
          temp.cardArray[tableData.playersHand[playerID].indexOf(elem1)].cardID = elem1;
          if(client.user.ID == elem){
            temp.cardHidden = false;
          }
        )
        temp.chipAmount = tableData.chips;
        )
        topTableData.push(temp)
      }
      else if(tableData.playerIDs.indexOf(elem)<6){
        rightTableData.push(temp)
      }
      else if(tableData.playerIDs.indexOf(elem)<7){
        centerTableData.push(temp);
      }
      else{
        leftTableData.push(temp);
      }
    ))
    this.client.TexasHoldemGamePage.setState(((state) => {return {TopTable: topTableData}}));
    this.client.TexasHoldemGamePage.setState(((state) => {return {RightTable: rightTableData}}));
    this.client.TexasHoldemGamePage.setState(((state) => {return {self: centerTableData}}));
    this.client.TexasHoldemGamePage.setState(((state) => {return {LeftTable: leftTableData}}));
  }),
  socket.on('endOfTurn',(playerInfo, turnPos)=>{
    
  }),
  socket.on('endOfRound',(playerInfo)=>{

  }),
  socket.on('endOfGame',(playerInfo, winningPlayerPos)=>{

  })
}
