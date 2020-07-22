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
// import tileData from './tileData';

export default function NewsPanel() {
  
  const [state, setState] = useState([])
  useEffect(() => {
      axios.get("/api/newspost").then(
          res => console.log(res)
      )
  })

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


        <Grid item container spacing={2}>
         


          {
            state.map(elem => (
            <Grid item xs={12} key={elem._id}>
              <Card width="100%">
                <CardHeader
                  title={`Update ${elem.title}`}
                  subheader={`${elem.date}`}    
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {`${elem.body}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>


      </Grid>
    </div>
    
          
    
  );
}
