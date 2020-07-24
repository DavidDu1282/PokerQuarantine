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

class ManagementPanel extends React.Component {
  state = {
    title: '',
    body: '',
    posts: []
  }
  componentDidMount = () => {
    this.getNewsPost();
  };

  getNewsPost = () => {
    axios.get('/api/users')
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
                  <TableCell >{post.name}</TableCell>
                  <TableCell >{post.defendant}</TableCell>
                  <TableCell >{post.type}</TableCell>
                  <TableCell >{post.info}</TableCell>
                  <TableCell >{post.date.day}</TableCell>
                  
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
          <Typography variant="h4">Management</Typography>
        </Grid>
        <Table aria-label="simple table">
          <TableHead>
              <TableRow>
                <TableCell><b>Reporter</b></TableCell>
                <TableCell ><b>Defendant</b></TableCell>
                <TableCell ><b>Report Type</b></TableCell>
                <TableCell ><b>Details</b></TableCell>
                <TableCell ><b>Date of Report</b></TableCell>

              </TableRow>
            </TableHead>
          {this.displayNewsPost(this.state.posts)}
          </Table>
          </Grid>
        </div>
    );
  }
}

export default ManagementPanel

