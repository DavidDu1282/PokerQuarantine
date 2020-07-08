
import React from 'react';
import { DarkContainer, LightContainer } from './../../components';
import { Typography } from '@material-ui/core';
import './MainPanel.scss'

class MainPanel extends React.Component {
  /* The panel player sees when they enter the website */

  render() {
    return (
      <div className="PanelContainer main">
        <div className="PanelContainer left">
        <DarkContainer style={{borderRadius: "4px 0 0 4px"}}>
          <Typography>Sample Text</Typography>
        </DarkContainer>
        </div>
        <div className="PanelContainer right">
        <LightContainer style={{borderRadius: "0 4px 4px 0"}}>
          <Typography>Sample Text</Typography>
        </LightContainer>
        </div>
      </div>
    );
  }
}

export default MainPanel;

