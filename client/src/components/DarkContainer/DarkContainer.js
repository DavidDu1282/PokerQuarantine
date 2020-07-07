import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#000000',
    height: "100%"
  }
});

export default function DarkContainer(props) {
  /* A dark variant of the <Paper> component*/
  const classes = useStyles();

  return (
    <Paper
      classes={{root: classes.root}}
      elevation={1 | props.elevation}
      style={props.style}
    >
      {props.children}
    </Paper>
  );
}
