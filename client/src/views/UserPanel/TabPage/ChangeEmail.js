import React from "react";
import { Grid, Button } from "@material-ui/core";
import { QuickForm } from "../../../components";
import axios from "axios";

class ChangeEmail extends React.Component {
  constructor(props) {
    super(props);
    this.change_form = React.createRef();
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
      await axios.post("/api/change_email", { newEmail: email });
      // await this.props.userData.data.updataEmail();
    } catch (err) {
      console.log(err);
      this.change_form.current.setErrorState(
        "email",
        "Email has been registered with an existing account."
      );
    }
  };

  render() {
    const { userData } = this.props;
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

export default ChangeEmail;
