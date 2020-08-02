import React from 'react';
//import logo from './logo.svg';
import MatchCard from './MatchCard.js'
import {
    Grid,
    Typography
} from '@material-ui/core/'

class MatchPanel extends React.Component {

  constructor(props) {
    super (props);

    this.client = props.client;
    this.state = {
      matchCard:[
        {
          id:1,
          title:'Texus Holdom',
          description : 'Two cards, known as hole cards, are dealt face down to each player, and then five community cards are dealt face up in three stages. The stages consist of a series of three cards ("the flop"), later an additional single card ("the turn" or "fourth street"), and a final card ("the river" or "fifth street"). Each player seeks the best five card poker hand from any combination of the seven cards of the five community cards and their two hole cards. Players have betting options to check, call, raise, or fold.',
          short_description: 'Two cards, known as hole cards, are dealt face down to each player, and then five community cards are dealt...',
          amount: 5.99
        },
        {
          id:2,
          title:'Sample Game',
          description : 'This is a sample game',
          short_description : 'This is a sample game, This is a sample game, This is a sample game ,This is a sample game This is a sample game... ',
          amount: 10.99
        },
        {
          id:3,
          title:'Sample Game',
          description : 'This is a sample game',
          short_description : 'This is a sample game, This is a sample game, This is a sample game ,This is a sample game This is a sample game... ',
          amount: 20.99
        }
      ]
    };

    this.match = this.match.bind(this);
  }

  match() {
    // initiate match
    if (this.client.matching) { 
      this.client.windowController.current.focus('Match');
      return;
    }

    this.client.windowController.current.show('Match');
    this.client.match();
  }

  fn() {
    /* for testing purposes */
    return;
  }

  render() {
    return (

      <div className="container-padded" float = 'right'>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
          spacing={4}
        >
          <Grid item><Typography variant="h4">Match</Typography></Grid>
          <Grid item container
          justify="flex-end"
          alignItems="center"
          spacing={2}
          direction="row">
            {this.state.matchCard.map(elem => (
              <Grid item xs={12} sm={4} md={4} key={this.state.matchCard.indexOf(elem)}>
                <MatchCard matchCard = {this.state.matchCard[this.state.matchCard.indexOf(elem)]} onMatch={this.match} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    )
  };
}

export default MatchPanel;
