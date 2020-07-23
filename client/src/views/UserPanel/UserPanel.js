import React from "react";
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
  Paper,
  withStyles,
} from "@material-ui/core";
import { Spacing } from "../../components";
import "./UserInfoPanel.scss";
import UserInfo from "./TabPage/UserInfo";
import ChangePassword from "./TabPage/ChangePassword";
import ChangeEmail from "./TabPage/ChangeEmail";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const GreyTabs = withStyles((theme) => ({
  indicator: {
    display: "none",
  },
}))((props) => <Tabs {...props} />);

const GreyTextTab = withStyles((theme) => ({
  root: {
    border: "1px solid #e9e9e9",
    "&:not(:first-of-type)": {},
    background: "#f7f7f7",
    opacity: 1,
  },
  selected: {
    borderBottomWidth: 0,
    background: "#ffffff",
    "& $wrapper": {
      opacity: 1,
    },
  },
  wrapper: {
    opacity: 0.7,
  },
  indicator: {
    display: "none",
  },
}))((props) => <Tab {...props} />);

const styles = (theme) => ({
  root: {},
  indicator: {
    display: "none",
  },
});
class UserPanel extends React.Component {
  /**
   * The panel that displays the players info
   */

  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const client = this.props.client;

    const { value } = this.state;

    return (
      <div className="container-userpanel">
        <Paper>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            alignContent="flex-start"
          >
            <GreyTabs value={value} onChange={this.handleChange}>
              <GreyTextTab label="User Info" />
              <GreyTextTab label="Change Password" />
              <GreyTextTab label="Change Email" />
            </GreyTabs>

            <TabPanel value={value} index={0}>
              <UserInfo client={client} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ChangePassword />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ChangeEmail client={client} />
            </TabPanel>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserPanel);
