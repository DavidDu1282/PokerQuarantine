import React from 'react';
import { 
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { Spacing, QuickForm } from '../../components';
import axios from 'axios';


class UpdatesPanel extends React.Component {
    constructor(props) {
        super(props)

    }

    handleSubmit = (event) => {
      const {title, body, date} = event.body;
      alert(`${title} ${body} ${date}  Registered Successfully !!!!`);
      axios.post('/api/newspost', {title: title, body: body, date: date})
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
              <Typography variant="h4">Add New Update</Typography>
            </Grid>
          <QuickForm 
            fields={{
              "title": {
                label: "Update Title",
                type: "text" },
              "body": {
                label: "About Update",
                type: "text" },
              "date": {
                label: "Date of Update",
                type: "date" }
            }}
            name="updates"
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
                      Post
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

export default UpdatesPanel