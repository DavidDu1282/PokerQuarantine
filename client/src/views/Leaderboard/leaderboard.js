import React from 'react';
import { DarkContainer, LightContainer } from '../../components';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './leaderboard.scss'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, username, chips) {
  return { name, username, chips};
}

const data = [
  createData('Jason', 'poker123', 300),
  createData('Marian', 'marmar', 5000),
  createData('John', 'jayjay1', 20),
  createData('Emily', 'emlee', 100),
];

const sortedData = data.sort((a, b) => b.chips - a.chips);

export default function LeaderBoard() {
  const classes = useStyles();

  
  return (
   

    <div className="">
    
    
    <Typography><b><header className = "newsH1">Leaderboard</header></b></Typography>

    
    <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell align="left"><b>Username</b></TableCell>
            <TableCell align="right"><b>Chips</b></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="right">{row.chips}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
           </div>
           
  );
}

