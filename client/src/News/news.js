import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { DarkContainer, LightContainer } from '.././components';
import { Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
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
      overlay: {
        position: 'fixed',
        top: '-80px',
        color: 'white',
        height: '70px',
        background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
     }
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
        <div className="PanelContainer main">
        <div className="PanelContainer left">
        <DarkContainer style={{borderRadius: "4px 0 0 4px"}}>
          <Typography>Nagivation Bar</Typography>
        </DarkContainer>
        </div>
        <div className="PanelContainer right">
        <LightContainer style={{borderRadius: "0 4px 4px 0"}}>
        <Typography><b><h1 className ="newsH1">NEWS</h1></b></Typography>

    
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >

      <CardMedia className={classes.img} src={image}  height="400" component="img" title="Some title" />
      <div style={classes.overlay}>
      <Typography p variant="h5" component="h1">
           <br></br> VERSION 3.1 IS FINALLY HERE!
          </Typography>
        </div>
        
        
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
                        </Card>
                     </Grid>
                ))}

    {/* <Divider variant="inset" component="hr" /> */}

    </Grid>
    </div>
      </LightContainer>
           </div>
       </div>
    );
  }




    {/* <Card className={classes.root}>
         <CardActionArea>
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
            Update 2
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            07.07.2020
          </Typography><br></br>
          <Typography variant="body2" color="textSecondary" component="p">
          Short description of update here
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card> */}
 