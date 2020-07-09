import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import tileData from './tileData';


function handleListItemClick(ReportID) {
    alert('Viewing ReportID: '+ ReportID)
  }
  
  const rows = [
    {name : 'Sample UserName 1', case_description: 'Sample Report Detail filled by user 1', time: '3:07', ReportID: 1000.0},
    {name : 'Sample UserName 2', case_description: 'Sample Report Detail filled by user 2', time:  '3:08', ReportID: 1001.0},
    {name : 'Sample UserName 3', case_description: 'Sample Report Detail filled by user 3', time: '3:09', ReportID: 1002.0},
    {name : 'Sample UserName 4', case_description: 'Sample Report Detail filled by user 4', time: '4:07', ReportID: 1003.0},
    {name : 'Sample UserName 5', case_description: 'Sample Report Detail filled by user 5', time: '5:07', ReportID: 1004.0},
    {name : 'Sample UserName 6', case_description: 'Sample Report Detail filled by user 6', time: '7:07', ReportID: 1005.0},
    {name : 'Sample UserName 7', case_description: 'Sample Report Detail filled by user 7', time: '8:07', ReportID: 1006.0},
    {name : 'Sample UserName 8', case_description: 'Sample Report Detail filled by user 8', time: '9:07', ReportID: 1007.0},
    {name : 'Sample UserName 9', case_description: 'Sample Report Detail filled by user 9', time: '9:09', ReportID: 1008.0},
    {name : 'Sample UserName 10', case_description: 'Sample Report Detail filled by user 10', time: '9:17', ReportID: 1009.0},
    {name : 'Sample UserName 11', case_description: 'Sample Report Detail filled by user 11', time: '9:27', ReportID: 1010.0},
    {name : 'Sample UserName 12', case_description: 'Sample Report Detail filled by user 12', time: '9:37', ReportID: 1011.0},
    {name : 'Sample UserName 13', case_description: 'Sample Report Detail filled by user 13', time: '9:47', ReportID: 1012.0},
    {name : 'Sample UserName 14', case_description: 'Sample Report Detail filled by user 14', time: '9:57', ReportID: 1013.0},
    {name : 'Sample UserName 15', case_description: 'Sample Report Detail filled by user 15', time: '9:57', ReportID: 1014.0},
    {name : 'Sample UserName 16', case_description: 'Sample Report Detail filled by user 16', time: '10:07', ReportID: 1015.0},
  ];
  
  
  export default function ManagementPanel() {

    return (
        <div className="container-padded">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        style={{flexWrap: "nowrap"}}
        spacing={4}
      >
        <Grid item>
          <Typography variant="h4">Management</Typography>
        </Grid>
        <Grid item>
          <Table aria-label="simple table">
          <TableHead>
              <TableRow>
                <TableCell><b>Username</b></TableCell>
                <TableCell align="left"><b>Report</b></TableCell>
                <TableCell align="right"><b>Time</b></TableCell>
                <TableCell align="left"><b> </b></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.case_description}</TableCell>
                  <TableCell align="right">{row.time}</TableCell>
                  <TableCell><Button size = 'small' variant="outlined" color="primary" onClick={(event) => handleListItemClick(row.ReportID)}>Details</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
    );
  }
  