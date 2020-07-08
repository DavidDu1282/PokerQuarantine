import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import './news.scss'
import image from './Poker.jpg';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';

// import tileData from './tileData';

const useStyles = () => ({
    root: {
      minWidth: 275,
    },
    pos: {
      marginBottom: 12,
    },
    img: {
        margin: 'auto',
        display: 'block',
        Width: '500%',
        Height: '50%',
        position: 'relative'
      },
  });
  
  export default function NewsPage() {
    const classes = useStyles();
    const data = [
        { update: 1, date: '07.07.2020', description: 'Insert short description here' },
        { update: 2, date: '07.08.2020', description: 'Insert short description here'  },
        { update: 3, date: '07.13.2020', description: 'Insert short description here' },
        { update: 4, date: '07.24.2020', description: 'Insert short description here'  }
    ]
  
    return (
       
       
      <div className={classes.root}>
        <Typography><b><h1>News</h1></b></Typography>

            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >

      <CardMedia className={classes.img} src={image}  height="400" component="img" title="Some title" />
        
        
        {data.map(elem => (
                    <Grid item xs={12} key={data.indexOf(elem)}>
                        <Card>
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

    {/* <Divider variant="inset" component="hr" /> */}

    </Grid>
    </div>
      
           
     
    );
  }
