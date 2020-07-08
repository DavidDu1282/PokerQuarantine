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
import Cards from './cards.jpg';
/*
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
*/
import Box from '@material-ui/core/Box';
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    maxHeight: 350,
  },
  media: {
    height: 340,
  },
});


export default function MatchCard(props) {
  const classes = useStyles();
  const [amounttobet] = React.useState('');
  return (
    <Card className={classes.root} >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.matchCard.title}
          height="140"
          image={Cards}
          title={props.matchCard.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.matchCard.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.matchCard.short_description}
          </Typography>
        </CardContent>
      </CardActionArea>

        <Box justifyContent="flex-end">
          <Box p={0} bgcolor="grey.300">
          <CardActions justifyContent = "flex-end">
            <Button size="Medium" color="primary" justifyContent = "flex-end" onClick={() => { alert('playing ' + props.matchCard.title + ' with $'+ amounttobet + ' worth of chips') }}>
              Play
            </Button>
          </CardActions>
        </Box>
        </Box>

    </Card>
  );
}
//
/*
        <InputLabel id="demo-simple-select-label">Amount</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={amounttobet}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <Button size="large" color="primary" onClick={() => { alert('playing ranked ' + props.matchCard.title + ' with $'+ amounttobet + ' worth of chips') }}>
          Play Ranked
        </Button>
        */
