import React from 'react';
import { Typography, CircularProgress, Button, Grid } from '@material-ui/core';
import './Matcher.scss'

class Matcher extends React.Component {
  /**
   * Match maker
   * ---------------------
   */

  constructor(props) {
    super(props);

    this.client = props.client;
  }
  

  render() {
    return (
      <div className="matcher">
        <Grid container justify="center" alignItems="center" alignContent="center" direction="column" spacing={3}>
          <Grid item><CircularProgress color="primary" /></Grid>
          <Grid item><Typography>Matching...</Typography></Grid>
          <Grid item><Button color="secondary" fullWidth onClick={() => this.client.unmatch()}>Exit</Button></Grid>
        </Grid>
      </div>
    )
  }
}

export default Matcher;