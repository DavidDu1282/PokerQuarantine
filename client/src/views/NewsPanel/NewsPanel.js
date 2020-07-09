import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';

// import tileData from './tileData';

export default function NewsPanel() {
  const data = [
      { update: 1, date: '07.07.2020', description: 'Insert short description here' },
      { update: 2, date: '07.08.2020', description: 'Insert short description here'  },
      { update: 3, date: '07.13.2020', description: 'Insert short description here' },
      { update: 4, date: '07.24.2020', description: 'Insert short description here'  }
  ]

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
          {data.map(elem => (
            <Grid item xs={12} key={data.indexOf(elem)}>
              <Card width="100%">
                <CardHeader
                  title={`Update ${elem.update}`}
                  subheader={`${elem.date}`}    
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {`${elem.description}`}
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
