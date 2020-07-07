import React from 'react';
import { DarkContainer, LightContainer } from '.././components';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './info.scss'
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import CardHeader from '@material-ui/core/CardHeader';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



const data = [
    {   name: 'marian', 
        username: 'marmar', 
        email: 'email@gmail.com',
        dob: '01.01.9999',
        balance:'3000',
        gamesplayed: '10',
        wins: '23',
        losses: '1',
    }
];

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  

export default function Board() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className="PanelContainer main">
      <div className="PanelContainer left">
          <DarkContainer style={{borderRadius: "4px 0 0 4px"}}>
          <Typography>Nagivation Bar</Typography>
          </DarkContainer>
          </div>
    <div className="PanelContainer right">
    <LightContainer style={{borderRadius: "0 4px 4px 0"}}>
    
    <Typography><b><header className = "newsH1">INFORMATION</header></b></Typography>

    <Paper className={classes.root}>
    <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="PLAYER INFO" {...a11yProps(0)} />
          <Tab label="ACCOUNT INFO" {...a11yProps(1)} />
          <Tab label="SETTINGS" {...a11yProps(2)} />
        </Tabs>
    
        <TabPanel value={value} index={0}>
        
        
        {data.map(data => (
            <Card>
                <CardContent>
                    <Typography variant="body" color="textSecondary" component="p">
                        {`Name: ${data.name}`}
                        <br></br>{`Username: ${data.username}`}
                        <br></br>{`Email: ${data.email}`}
                        <br></br>{`Birthday: ${data.dob}`}
                        <br></br>{`Games Played: ${data.gamesplayed}`}
                       <br></br> {`Wins: ${data.wins}`}
                       <br></br> {`Losses: ${data.losses}`}


                    </Typography>
                </CardContent>
            </Card>
                ))}

        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
   
    </Paper>

      </LightContainer>
           </div>
           </div>
  );
}

