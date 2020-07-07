import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import './UserInfoPanel.scss';


export default function UserInfoPanel(props) {
  /**
   * The panel that displays the players info
   */

  const user_info = [];
  for (const [key, value] of Object.entries(props.client.user.userdata)) {
    user_info.push(
      <Grid item xs key={key}>
        <Typography variant="h6">{`${key}`}</Typography>
        <Typography>{`${value}`}</Typography>
      </Grid>
    );
  }

  return (
    <div className="container-padded">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs>
          <Typography variant="h3">User Info</Typography>
        </Grid>
        {user_info}

      </Grid>
    </div>
  );
}
