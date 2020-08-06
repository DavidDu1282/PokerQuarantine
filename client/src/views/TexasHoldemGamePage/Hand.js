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
      justify="center"
      alignItems="flex-start"
      alignContent="flex-start"
      spacing={0}>

      {props.hand.cardArray.map((elem, index) => (
        <Grid item xs={3} sm={1} md={1} key = {index}>
          <img src= {(() => {
            switch (elem.cardHidden) {
              case true:   return "/cards_jpeg_zip/JPEG/Red_back.jpg";
              default:      return "/cards_jpeg_zip/JPEG/" + elem.cardID + ".jpg";
            }

          })()} className = "card" ></img>

        </Grid>
      ))}
      <div className = "empty-spacing"></div>
    </Grid>

    </>
  );
}
