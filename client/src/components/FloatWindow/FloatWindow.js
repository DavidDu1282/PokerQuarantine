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
      style={{top: props.y, left: props.x, width: `${props.width}px`, height: `${props.height}px`, zIndex: props.z, borderRadius: "4px"}}
      onMouseDown={props.onClick}
    >
      {props.variant === 'full' && (
        <div>
          <DarkContainer style={{borderRadius: "4px 4px 0 0"}} elevation={0}>
            <div>
              <div 
                className="float-drag"
                style={{zIndex: props.z, width: `${props.width-30}px`}}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
              >
                <Typography style={{color: 'grey'}} variant='overline'>{props.name}</Typography>
              </div>
              <span style={{zIndex: props.z, width: `30px`, height: `30px`, float: 'right'}}>
                {props.nonClosable ? (<React.Fragment />) : (<IconButton size='small' style={{color: 'grey'}} onClick={() => props.controller.hide(props.name)}><MinimizeIcon /></IconButton>)}
              </span>
            </div>
          </DarkContainer>
          <LightContainer style={{borderRadius: "0 0 4px 4px"}} elevation={0}>
            {props.nonPadded ?
              (<div style={{height: `${props.height-30}px`, padding: 'none'}}>{props.children}</div>) :
              (<div className="scroll-container"><div className="container-padded" style={{height: `${props.height-30}px`, padding: '2em'}}>{props.children}</div></div>)
            }
            
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
