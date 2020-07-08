import React from 'react';
import { Typography, Grid, Avatar, Link } from '@material-ui/core';
import { Spacing } from './../../components';
import './UserInfoPanel.scss';


export default function UserInfoPanel(props) {
  /**
   * The panel that displays the players info
   */


  const user = props.client.user;

  return (
    <div className="container-padded">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        alignContent="flex-start"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4">User Info</Typography>
          <Spacing height={2} />
        </Grid>

        <Grid
          container
          item
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid
            container
            item xs={10}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs>
              <Typography variant="h6">Username</Typography>
              <Typography>{user.name}</Typography>
            </Grid>

            <Grid item xs>
              <Typography variant="h6">User Type</Typography>
              <Typography>{user.type}</Typography>
            </Grid>

            <Grid item xs>
              <Typography variant="h6">Email</Typography>
              <Typography>{user.email}</Typography>
            </Grid>

          </Grid>
          

          <Grid
            container
            item xs={2}
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Avatar src={user.avatar_url} alt={user.name} style={{height: "5em", width: "5em"}} />
            </Grid>
            <Grid item>
              <Link>
                Edit
              </Link>
            </Grid>
          </Grid>

        </Grid>

        <Grid item>
          <Typography variant="h6">Birthday</Typography>
          <Typography>{user.dob.format('MMMM Do, YYYY')}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">Chips</Typography>
          <Typography>{`${user.balance}`}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">Wins / Losses / Total Games Played</Typography>
          <Typography>{`${user.wins} / ${user.losses} / ${user.games_played}`}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
