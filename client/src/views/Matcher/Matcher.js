import React from 'react';
import { Typography, CircularProgress, Button, Grid } from '@material-ui/core';
import './Matcher.scss'

export default function Matcher(props) {
  /**
   * Match maker display
   * ---------------------
   */
  
  return (
    <div className="matcher">
      <Grid container justify="center" alignItems="center" alignContent="center" direction="column" spacing={3}>
        <Grid item><CircularProgress color="primary" /></Grid>
        <Grid item><Typography>Matching...</Typography></Grid>
        <Grid item><Button color="secondary" fullWidth onClick={() => props.client.unmatch()}>stop</Button></Grid>
      </Grid>
    </div>
  );
}
