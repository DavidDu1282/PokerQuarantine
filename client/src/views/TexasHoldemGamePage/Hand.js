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
    <Typography>{props.hand.playerName + " " + props.hand.betAmount}</Typography>
    <Grid
      container
      direction="row"
      justify="flex"
      alignItems="flex"
      alignContent="flex"
      spacing={0}>

      {props.hand.cardIDs.map(elem => (
        <Grid item xs={3} spacing sm={1} md={1}>
          <img src= {(() => {
            switch (props.hand.cardHidden[props.hand.cardIDs.indexOf(elem)]) {
              case true:   return "/cards_jpeg_zip/JPEG/Red_back.jpg";
              default:      return "/cards_jpeg_zip/JPEG/" + elem + ".jpg";
            }

          })()} className = "card" ></img>

        </Grid>
      ))}
      <div className = "empty-spacing"></div>
    </Grid>

    </>
  );
}
