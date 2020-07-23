import React from 'react';
import { 
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { Spacing, QuickForm } from '../../components';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
class UpdatesPanel extends React.Component {
    constructor(props) {
        super(props)

    }

    state = {
      title: '',
      body: '',
      posts: []
    }
    componentDidMount = () => {
      this.getNewsPost();
    };
  
    
deleteContact(_id) { // <-- declare id parameter
  
  axios.post('/api/newspost/delete', {id: _id})
  alert("Refresh to view updated list of updates")
}

    getNewsPost = () => {
      axios.get('/api/newspost')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }
  displayNewsPost = (posts) => {
  
    if (!posts.length) return null;
    return posts.map((post, _id) => (
      
      <Grid item container spacing={2}>
      <Grid item xs={12} key={post._id}>
      <Card width="100%">
      <CardHeader title={post.title} subheader={post.date}/>
      <CardContent>
        <Typography variant="body" color="textSecondary" component="p">
          {post.body}  
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary" onClick={ () => this.deleteContact(post._id) } >
          Delete
        </Button>
      </CardActions>
      </Card>
      </Grid>
      </Grid>
    ));
  };

    handleSubmit = (event) => {
      const {title, body, date} = event.body;
      alert(`${title} ${body} ${date}  Registered Successfully !!!!`);
      axios.post('/api/newspost', {title: title, body: body, date: date})
    }

    render() {
      console.log('State: ', this.state);
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

  <Grid item>
  <Spacing height={2}/>
    <Typography variant="h4">Modify Posts</Typography>
  </Grid>

    {this.displayNewsPost(this.state.posts)}
    </Grid>

    </div>        
        )
    }
}

export default UpdatesPanel