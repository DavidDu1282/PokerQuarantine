import React from "react";
import { IconButton, Grid, Typography, Box } from '@material-ui/core';
import MinimizeIcon from '@material-ui/icons/Minimize';
import { LightContainer, DarkContainer } from '..';
import './FloatWindow.scss'

export default function FloatWindow(props) {
  /**
   * Float window container providing window with drag & move capability
   * ------------------ 
   * props:
   *    label: str
   *    variant: 'transparent' | 'full' (default)
   *    x: int
   *    y: int
   *    z: int
   *    nonClosable: bool
   */

  if (!props.display) return (<React.Fragment />);

  return (
    <Box
      boxShadow={props.elevation}
      className="float-window"
      style={{top: props.y, left: props.x, width: props.width, height: props.height, zIndex: props.z, borderRadius: "4px"}}
      onMouseDown={props.onClick}
    >
      {props.variant === 'full' && (
        <div>
          <DarkContainer style={{borderRadius: "4px 4px 0 0"}} elevation={0}>
            <Grid
              container
            >
              <Grid item xs={10}><div 
                className="float-drag"
                style={{zIndex: props.z}}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
              >
                <Typography style={{color: 'grey'}} variant='overline'>{props.name}</Typography>
              </div></Grid>
              <Grid item xs={2}>
                {props.nonClosable ? (<React.Fragment />) : (<IconButton size='small' style={{color: 'grey'}} onClick={() => props.controller.hide(props.name)}><MinimizeIcon /></IconButton>)}
              </Grid>
            </Grid>
          </DarkContainer>
          <LightContainer style={{borderRadius: "0 0 4px 4px"}} elevation={0}>
            <div className="scroll-container"><div className="container-padded" style={{minHeight: props.height-30, padding: '2em'}}>{props.children}</div></div>
          </LightContainer>
        </div>
      )}

      {props.variant === 'transparent' && (
        <React.Fragment>
          <div
            className="float-drag clear"
            style={{zIndex: props.z+1}}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
          />
          {props.children}
        </React.Fragment>
      )}
    </Box>
  );
}
