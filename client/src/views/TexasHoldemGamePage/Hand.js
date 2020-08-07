import React  from 'react';
//import PropTypes from 'prop-types';
import {
    Grid, Typography,
} from '@material-ui/core/'


export default function Hand(props) {

  
  if (!props.hand) return (<div/>);
  else if (!props.hand.cardArray) return (<div/>);
  return (
    <div>
      <Typography>{props.hand.name}</Typography>
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
                default:      return "/cards_jpeg_zip/JPEG/" + elem.cardID.toUpperCase() + ".jpg";
              }

            })()} className = "card" ></img>

          </Grid>
        ))}
        <div className = "empty-spacing"></div>
      </Grid>

    </div>
  );
}
