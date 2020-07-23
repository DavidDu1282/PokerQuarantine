import React from "react";
import { Typography, Grid, Avatar, Link, Button } from "@material-ui/core";
import { Spacing } from "../../../components";
import "../UserInfoPanel.scss";

class UserInfoPanel extends React.Component {
  /**
   * The panel that displays the players info
   */

  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
  }

  async changeAvatar(e) {
    await this.props.client.updateUser("avatar", e.target.files[0]);
  }

  triggerAvatarChange(e) {
    e.preventDefault();
    this.fileInput.current.click();
  }

  render() {
    const user = this.props.client.user;

    const handleAvatarChange = async (e) => {
      this.changeAvatar(e);
    };

    return (
      <div className="container-padded">
        <input
          type="file"
          ref={this.fileInput}
          onChange={handleAvatarChange}
          accept="image/*"
          style={{ display: "none" }}
        />

        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <Grid item></Grid>

          <Grid
            container
            item
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid
              container
              item
              xs={10}
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
              item
              xs={2}
              direction="column"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Avatar
                  src={user.avatar_url}
                  alt={user.name}
                  style={{ height: "5em", width: "5em" }}
                />
              </Grid>
              <Grid item>
                <Link href="#" onClick={(e) => this.triggerAvatarChange(e)}>
                  Edit
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="h6">Birthday</Typography>
            <Typography>{user.dob.format("MMMM Do, YYYY")}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">Chips</Typography>
            <Typography>{`${user.balance}`}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">
              Wins / Losses / Total Games Played
            </Typography>
            <Typography>{`${user.wins} / ${user.losses} / ${user.games_played}`}</Typography>
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              onClick={() => this.props.client.deleteUser()}
            >
              delete user
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default UserInfoPanel;
