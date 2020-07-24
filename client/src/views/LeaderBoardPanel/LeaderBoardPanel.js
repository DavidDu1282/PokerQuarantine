import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import tileData from './tileData';
import axios from 'axios';
// import tileData from './tileData';

class LeaderBoardPanel extends React.Component {
  state = {
    title: '',
    body: '',
    posts: []
  }
  componentDidMount = () => {
    this.getNewsPost();
  };

  getNewsPost = () => {
    axios.get('/api/top10')
    .then((response) => {
      const data = response.data;
      this.setState({ posts: data });
      console.log('Data has been received!!');
    })
    .catch(() => {
      alert('Error retrieving data!!!');
    });
}


displayNewsPost = (posts) => {

  if (!posts.length) return null;
  return posts.map((post, _id) => (
    
    <TableRow key={post._id}>
                  <TableCell align = "left">{post.name}</TableCell>
                  <TableCell align = "center" >{post.games_played}</TableCell>
                  <TableCell align = "center" >{post.wins}</TableCell>
                  <TableCell align = "center">{post.losses}</TableCell>
                  <TableCell align = "center">{post.balance}</TableCell>
                  
                </TableRow>
  ));
};
  render(){
    console.log('State: ', this.state);
    return (
      <div className="container-padded">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{flexWrap: "nowrap"}}
        spacing={4}
      >
        <Grid item>
          <Typography variant="h4">Leaderboard</Typography>
        </Grid>
        <Table aria-label="simple table">
          <TableHead>
              <TableRow>
                <TableCell align = "left"><b>Username</b></TableCell>
                <TableCell align = "center"><b>Games played</b></TableCell>
                <TableCell align = "center"><b>Wins</b></TableCell>
                <TableCell align = "center"><b>Losses</b></TableCell>
                <TableCell align = "center"><b>Number of Chips</b></TableCell>

              </TableRow>
            </TableHead>
          {this.displayNewsPost(this.state.posts)}
          </Table>
          </Grid>
        </div>
    );
  }
}

export default LeaderBoardPanel

