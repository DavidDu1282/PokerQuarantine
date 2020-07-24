import React from "react";
import { Grid, Button } from "@material-ui/core";
import { QuickForm } from "../../../components";
import axios from "axios";
import { withSnackbar } from "notistack";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.change_form = React.createRef();
  }
  async onChangePassword(result) {
    // if error
    if (!result) return;

    const { ConfirmPassword, NewPassword } = result.body;

    // detect formatting errors
    if (ConfirmPassword !== NewPassword) {
      this.change_form.current.setErrorState(
        "NewPassword",
        `Passwords do not match.`
      );
      return;
    }
  }

  handleSubmit = async (result) => {
    // if error
    if (!result) return;

    const { OldPassword, ConfirmPassword, NewPassword } = result.body;

    // detect formatting errors
    if (ConfirmPassword !== NewPassword) {
      this.change_form.current.setErrorState(
        "NewPassword",
        `Passwords do not match.`
      );

      return;
    }

    try {
      await axios.post("/api/config/change_password", {
        currPassword: OldPassword,
        newPassword: NewPassword,
      });
      this.props.enqueueSnackbar("Successfuly changed password!", {
        variant: "success",
      });
    } catch (err) {
      this.props.enqueueSnackbar("Error Incorrect Password", {
        variant: "error",
      });
    }
  };

  render() {
    return (
      <div className="container-padded">
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          style={{ flexWrap: "nowrap" }}
          spacing={4}
        >
          <QuickForm
            ref={this.change_form}
            fields={{
              OldPassword: {
                label: "Old Password",
                type: "password",
              },

              NewPassword: {
                label: "New Password",
                type: "password",
              },
              ConfirmPassword: {
                label: "Confirm New Password",
                type: "password",
              },
            }}
            name="change_password"
            tBoxVariant="filled"
            button={
              <React.Fragment key="spacing button">
                <Grid container key="button" alignItems="center">
                  <Grid item xs={2}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            }
            onSubmit={this.handleSubmit}
          />
        </Grid>
      </div>
    );
  }
}

export default withSnackbar(ChangePassword);
