import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import firebase from '../firebase.js';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    textField: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        flexBasis: 280,
    },
    button: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
      },
    paper: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
      },
  });

  /** 
  * Types of sightings. Label is what is
  * viewed in the application, value is
  * what is stored in the database.
  */
  const sightingTypes = [
    {
      value: 'visual',
      label: 'Visual',
    },
    {
      value: 'roadkill',
      label: 'Roadkill',
    },
    {
      value: 'trapped',
      label: 'Trapped',
    },
    {
      value: 'viewed_tracks',
      label: 'Viewed Tracks',
    },
    {
      value: 'photo',
      label: 'Photo',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];
  
  /** 
   * Levels of confidence. Label is what is
   * viewed in the application, value is
   * what is stored in the database.
  */
  const confidenceLevels = [
      {
        value: '1',
        label: '1 - Strongly unconfident',
      },
      {
        value: '2',
        label: '2 - Unconfident',
      },
      {
        value: '3',
        label: '3 - Somewhat confident',
      },
      {
        value: '4',
        label: '4 - Confident',
      },
      {
        value: '5',
        label: '5 - Very confident',
      },
    ];

    /**
     * Gets formatted confidence value.
     */
    function getConfidence(item) {
        for (var i = 0; i < confidenceLevels.length; i++) {
            if (confidenceLevels[i].value === item) {
                return confidenceLevels[i].label;
            }
        }
        
    }

    /**
     * Gets formatted type value.
     */
    function getType(item) {
        for (var i = 0; i < sightingTypes.length; i++) {
            if (sightingTypes[i].value === item) {
                return sightingTypes[i].label;
            }
        }
    }

class ViewSightings extends React.Component {
    constructor(props){
        super(props);

       this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        id: '',
        type: 'N/A',
        confidence: 'N/A',
        date: 'N/A',
        time: 'N/A',
        desc: 'N/A',
        lat: 'N/A',
        lng: 'N/A'
    };
    

    /**
     * Handles state change.
     */
    handleChange = name => event => {
        this.setState({
        [name]: event.target.value,
        });
    };

    /**
     * Handles submit on search.
     */
    handleSubmit(e){
        e.preventDefault();
        const itemSighting = firebase.database().ref("sightings/" + this.state.id);
        itemSighting.once("value").then((snapshot) => {
            let data = snapshot.val();
            this.setState({
                date: data.date,
                time: data.time,
                type: getType(data.type),
                confidence: getConfidence(data.confidence),
                desc: data.desc,
                lat: data.lat,
                lng: data.lng
            });
        });
    };

    render(){
        const { classes } = this.props;
        return (
            /**
             * The below houses the search
             * and submit button along with
             * the sighting information
             * it pulls.
             */
            <Fragment>
                <Grid container justify="center">
                    <form className={classes.container} onSubmit={this.handleSubmit}>
                    <Grid item xs={6}>
                        <TextField
                        id="sighting-id"
                        name="sighting-id"
                        label="Input ID"
                        value={this.state.id}
                        margin="normal"
                        onChange={this.handleChange('id')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" type="submit" color="primary" className={classes.button}>
                            Submit
                        </Button>
                    </Grid>
                    </form>
                    <Grid item xs={12}>
                        <Paper elevation={2}>
                            <Typography variant="headline" component="h3">
                            Sighting
                            </Typography>
                            <Typography component="p">
                            <b>Type:</b> {this.state.type} {<br/>}
                            <b>Confidence:</b> {this.state.confidence} {<br/>}
                            <b>Date:</b> {this.state.date} {<br/>}
                            <b>Time:</b> {this.state.time} {<br/>}
                            <b>Latitude:</b> {this.state.lat} {<br/>}
                            <b>Longitude:</b> {this.state.lng} {<br/>}
                            <b>Description:</b> {this.state.desc}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Fragment>
        )

    }

}

ViewSightings.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ViewSightings);