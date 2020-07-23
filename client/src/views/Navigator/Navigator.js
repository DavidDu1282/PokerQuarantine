import React from 'react';
import { DarkContainer, LightContainer } from '../../components';
import { Tab, Tabs, withStyles, ButtonBase, Grid, Typography, IconButton, Avatar, Fade } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import './Navigator.scss';
import styles from './../../config.scss';

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
      {value === index && (<React.Fragment>{children}</React.Fragment>)}
    </div>
  );
}

const GreyTextTab = withStyles((theme) => ({
  root: {
    color: styles.grey
  },
  disabled: {
    display: "none"
  }
}))((props) => <Tab {...props} />);


class Navigator extends React.Component {
  /**
   * The panel player sees when they enter the website
   * basically a styled navigator
   * props: user=User
   */

  constructor(props) {
    super(props);

    let tabs = Object.keys(this.props.list);
    let panes = Object.values(this.props.list);
    let display = this.props.client.user.display_setting;

    this.state = {
      tabs: tabs,
      panes: panes,
      selectedTab: 0,
      display: display
    };
  }

  setDisplay(new_display, tab) {
    /**
     * Sets the display status to new_display
     * Expects a Map with the same keys as the nav's listing 
     */

    if (process.env.NODE_ENV === 'development') {
      // assert if arrays have similar length
      
      if (new_display.length !== this.state.display.length) {
        throw new Error('new_display is in a different length');
      }
    }

    this.setState((state) => {
      return {
        display: new_display,
        selectedTab: tab
      };
    });
  }

  setSelectedTab(newValue) {
    this.setState((state) => {
      return { selectedTab: newValue };
    });
  }

  render() {
    const tabs = [];
    const panes = [];

    const handleChange = (event, newValue) => {
      this.setSelectedTab(newValue);
    };

    this.state.display.forEach((item, index) => {
      tabs.push(<GreyTextTab label={this.state.tabs[index]} key={index} disabled={!item}/>);
      panes.push(<Fade in={this.state.selectedTab === index} key={index}><TabPanel value={this.state.selectedTab} index={index}>{this.state.panes[index]}</TabPanel></Fade>);
    })

    return (
      <div className="panelContainer main">

        <div className="panelContainer left">
        <DarkContainer style={{borderRadius: "4px 0 0 4px"}}>
          <div className="nav-content">
            <img src={'/Logo-withText-dark.png'} style={{width: "90%", margin: "1em auto"}} alt="logo" />

            <Tabs
              orientation="vertical"
              value={this.state.selectedTab}
              onChange={handleChange}
              textColor="primary"
              variant='fullWidth'
              indicatorColor="secondary"
            >
              {tabs}
            </Tabs>

            {this.props.client.user.raw_type !== 9 && (
              <Grid
                container
                style={{padding: "0.8em 1em", alignSelf: "flex-end", marginTop: "auto"}}
                alignItems="center"
                spacing={0}
              >
                <Grid item xs={10}>
                  <ButtonBase
                    disableRipple
                    disableTouchRipple
                    onClick={e => this.setSelectedTab(9)}
                  >
                    <Avatar src={this.props.client.user.avatar_url} alt={this.props.client.user.name}/>
                    <Typography style={{color: "white", marginLeft: "0.8em"}} variant="body2">{this.props.client.user.name}</Typography>
                  </ButtonBase>
                </Grid>
                <Grid item xs={2}>
                  <IconButton size="small" onClick={async (e) => await this.props.client.logout()}>
                    <ExitToApp color="secondary"/>
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </div>

        </DarkContainer>
        </div>

        <div className="panelContainer right">
        <LightContainer style={{borderRadius: "0 4px 4px 0"}}>
          {panes}
        </LightContainer>
        </div>
      </div>
    );
  }
}

export default Navigator;