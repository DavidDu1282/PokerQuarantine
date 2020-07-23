import React from 'react';
import { 
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { Spacing, QuickForm } from '../../components';
import axios from 'axios';


class ReportPanel extends React.Component {
      constructor(props) {
        super(props)

    }

      handleSubmit = (event) => {
        const {type, info, defendant} = event.body;
        alert(`${type} ${info} ${defendant} Report Successfully !!!!`);
        axios.post('api/Reports', {type: type, info: info, defendant: defendant})
      }

    render() {
        return (
          <div className="container-padded">
            
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{flexWrap: "nowrap"}}
            spacing={4}
          >
            <Grid item>
              <Typography variant="h4">Report</Typography>
            </Grid>

          <QuickForm 
            fields={{
        
              "defendant": {
                label: "Username of Other Player",
                type: "text" },
                "type": {
                label: "Type of Abuse",
                type: "select", selectOptions: {'Bullying': 'Bullying', 'Hacking': 'Hacking'}},
                "info": {
                label: "Short Description (Optional)",
                type: "text"
             }
            }}
            
            name="reports"
            tBoxVariant="filled"
            button={
              <React.Fragment key="spacing button">
                <Grid item xs>
                  <Spacing height={2}/>
                </Grid>
                <Grid container key="button" alignItems="center">
                
                  <Grid item xs={2}>
                    geelelge
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
  
            
        )
    }
}

export default ReportPanel