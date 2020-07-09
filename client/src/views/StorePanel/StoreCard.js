import React  from 'react';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
});


export default function StoreCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.storeCard.title}
          height="140"
          image="/chips.png"
          title={props.storeCard.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.storeCard.title}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {props.storeCard.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box justifyContent="flex-end">
        <Box p={0} bgcolor="grey.300">
      <CardActions>

        <Button size="large" color="primary" onClick={() => { alert(props.storeCard.description) }}>
          More Info
        </Button>
        <Button size="large" color="primary" onClick={() => { alert('Paying '+ props.storeCard.amount) }}>
          Purchase
        </Button>

      </CardActions>
      </Box>
    </Box>
    </Card>
  );
}
