import React from "react";
import { Grid, Button } from "@material-ui/core";
import { QuickForm } from "../../../components";
import axios from "axios";
import { withSnackbar } from "notistack";

class ChangeEmail extends React.Component {
  constructor(props) {
    super(props);
    this.change_form = React.createRef();
  }

  async changeEmail(newEmail) {
    await this.props.client.updateUser("email", newEmail);
    setTimeout(this.forceUpdate(), 3000);
  }

  handleSubmit = async (result) => {
    // if error
    if (!result) return;

    const { email } = result.body;

    let email_regrex = /(\w+@\w+\.\w+)/g;
    // detect formatting errors
    if (!email.match(email_regrex)) {
      this.change_form.current.setErrorState(
        "email",
        "Please enter a valid email."
      );
    }

    try {
      await axios.post("/api/check_email", { email: email });
      await axios.post("/api/config/change_email", { newEmail: email });
      this.props.enqueueSnackbar("Successfuly changed email!", {
        variant: "success",
      });
      this.changeEmail(email);
    } catch (err) {
      this.change_form.current.setErrorState(
        "email",
        "Email has been registered with an existing account."
      );
    }
  };

  render() {
    const user = this.props.client.user;
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
              email: {
                label: "Change Email",
                type: "email",
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

export default withSnackbar(ChangeEmail);
