import React from 'react';
import { 
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { Spacing, QuickForm } from '../../components';



class ReportPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            UpdateTitle: "",
            AboutUpdate: "",
            DateofUpdate: "",
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    firsthandler = (event) => {
        this.setState({
            UpdateTitle: event.target.value
        })
    }
    lasthandler = (event) => {
        this.setState({
            AboutUpdate: event.target.value
        })
    }
    DateofUpdatehandler = (event) => {
        this.setState({
            DateofUpdate: event.target.value
        })
    }

  
    handleSubmit = (event) => {
      const { UpdateTitle, AboutUpdate, DateofUpdate} = event.body;
        alert(`${this.state.UpdateTitle} ${this.state.AboutUpdate}  Registered Successfully !!!!`)
        console.log(this.state);
        this.setState({
            UpdateTitle: "",
            AboutUpdate: "",
            DateofUpdate: "",
         
        })     
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
              "ReporterUN": {
                label: "Your Username",
                type: "text" },
              "ReportedUN": {
                label: "Username of Other Player",
                type: "text" },
              "TypeofAbuse": {
                label: "Type of Abuse",
                type: "select",
                selectOptions: {
                  'Example1': 1,
                  'Example2': 2
                }  
              },
              "ShortDesc": {
                label: "Short Description (Optional)",
                type: "text"
             }
            }}
            name="register"
            tBoxVariant="filled"
            button={
              <React.Fragment key="spacing button">
                <Grid item xs>
                  <Spacing height={2}/>
                </Grid>
                <Grid container key="button" alignItems="center">
                
                  <Grid item xs={2}>
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