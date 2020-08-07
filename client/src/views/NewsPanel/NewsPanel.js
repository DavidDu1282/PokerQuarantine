import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import { useState, useEffect  } from 'react';
import axios from 'axios';
import moment from 'moment';
// import tileData from './tileData';

class NewsPanel extends React.Component {
  state = {
    title: '',
    body: '',
    posts: []
  }
  componentDidMount = () => {
    this.getNewsPost();
  };

  getNewsPost = () => {
    axios.get('/api/newspost')
    .then((response) => {
      const data = response.data;
      this.setState({ posts: data });
    });
}
displayNewsPost = (posts) => {

  if (!posts.length) return null;
  return posts.map((post, _id) => (
    
    <Grid item container spacing={2}>
    <Grid item xs={12} key={post._id}>
    <Card width="100%">
    <CardHeader title={post.title} subheader={moment(post.date).format("MMMM Do, YYYY")}/>
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {post.body}  
      </Typography>
    </CardContent>
    <CardActions>
      {/* <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button> */}
    </CardActions>
    </Card>
    </Grid>
    </Grid>
  ));
};
  render(){
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
          <Typography variant="h4">News</Typography>
        </Grid>
        <Grid item>
          <CardMedia src={'/Poker.jpg'} component="img" height="400" title="Some title" />
        </Grid>
          {this.displayNewsPost(this.state.posts)}
          </Grid>
        </div>
    );
  }
}

export default NewsPanel

