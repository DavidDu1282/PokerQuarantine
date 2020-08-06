import React  from 'react';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import styles from './style.scss';
import {
    Grid, Typography,
} from '@material-ui/core/'
const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    maxHeight: 500,
  },
  media: {
    height: 140,
  },
});


export default function Hand(props) {
  const classes = useStyles();
  return (
    <>
    <Grid
      container
      direction="row"
      justify="flex"
      alignItems="flex"
      alignContent="flex"
      spacing={2}>
      {props.hand.cardIDs.map(elem => (
        <Grid item xs={5} spacing sm={1} md={1}>
          <img src= {"/cards_jpeg_zip/JPEG/" + elem + ".jpg"} className = "card" ></img>
          <div className = "empty-spacing"></div>
        </Grid>
      ))}
    </Grid>
    </>
  );
}
/*<Card className={classes.root} >
  <CardActionArea>
  <CardMedia
    component="img"
    alt={props.hand.playerID}
    height="400"
    width ="100"
    image="/cards_jpeg_zip/JPEG/2C.jpg"
    title={props.hand.playerID}
  />
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {props.hand.playerID}
      </Typography>
      <Typography variant="body2" color="textPrimary" component="p">
        {props.hand.cardSum}
      </Typography>
    </CardContent>
  </CardActionArea>
  <Box justifyContent="flex-end">
    <Box p={0} bgcolor="grey.300">
      <CardActions></CardActions>
    </Box>
  </Box>
</Card>
<Typography>{"           " + props.hand.playerID + " has cardSum "}</Typography>
<Typography>{props.hand.cardSum}</Typography>
*/
