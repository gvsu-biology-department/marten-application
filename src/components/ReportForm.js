import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../firebase.js';
import MapContainer from '../pages/Map';

/**
 * Styles that the different
 * Material UI components pull
 * in. Mostly used for spacing.
 */
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    flexBasis: 280,
  },
  button: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
  dense: {
    marginTop: 30,
  },
  menu: {
    width: 200,
  },
});

/**
 * Function for formatting the
 * date as a string that
 * Material UI can use. We'll
 * also store the date like
 * this string in the database.
 * @param {*} date, Date passed in. 
 */
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

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
 * The form component.
 */
class ReportForm extends React.Component {
  /**
   * Component contructor. Currently
   * only used to bind event
   * handlers.
   */
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * State of form components.
   */
  state = {
    date: formatDate(new Date()),
    time: '00:00',
    type: 'visual',
    confidence: '1',
    desc: '',
    lat: '',
    lng: ''
  };

  /**
   * Handles state change in form
   * components.
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  /*
  * Get the coordinates 
  * 
  */
 getCoordinates = (lat,lng) => {
    let latitude = lat;
    let longitude = lng;

    this.setState({
        lat: latitude,
        lng: longitude
    });
  }

  /**
   * Event listener for form.
   * When the form is submitted,
   * this function passes the
   * data along to Firebase.
   */
  handleSubmit(e) {
    e.preventDefault();
    const sightingsRef = firebase.database().ref('sightings');
    const sighting = {
      type: this.state.type,
      confidence: this.state.confidence,
      date: this.state.date,
      time: this.state.time,
      desc: this.state.desc,
      lat: this.state.lat,
      lng: this.state.lng
    }
    sightingsRef.push(sighting);
    this.setState({
      date: formatDate(new Date()),
      time: '00:00',
      type: 'visual',
      confidence: '1',
      desc: '',
      lat: '',
      lng: ''
    });
  };
  

  /**
   * The render method for this component.
   */
  render() {
    const { classes } = this.props;

    /**
     * The actual form.
     */
    return (
        <Fragment>
            <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <TextField
                                id="select-sighting-type"
                                select
                                required
                                name="sighting-type"
                                label="Select"
                                className={classes.textField}
                                value={this.state.type}
                                onChange={this.handleChange('type')}
                                SelectProps={{
                                    MenuProps: {
                                    className: classes.menu,
                                    },
                                }}
                                helperText="Please select type of sighting"
                                >
                                {sightingTypes.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                id="select-confidence"
                                select
                                required
                                name="sighting-confidence"
                                label="Select"
                                className={classes.textField}
                                value={this.state.confidence}
                                onChange={this.handleChange('confidence')}
                                SelectProps={{
                                    MenuProps: {
                                    className: classes.menu,
                                    },
                                }}
                                helperText="Please select confidence in sighting"
                                >
                                {confidenceLevels.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="sighting-date"
                                    required
                                    label="Sighting date"
                                    name="sighting-date"
                                    type="date"
                                    value={this.state.date}
                                    className={classes.textField}
                                    onChange={this.handleChange('date')}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="sighting-time"
                                    required
                                    label="Sighting time"
                                    name="sighting-time"
                                    type="time"
                                    margin="normal"
                                    value={this.state.time}
                                    className={classes.textField}
                                    onChange={this.handleChange('time')}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                id="sighting-description"
                                required
                                label="Description"
                                name="sighting-desc"
                                multiline
                                rows="5"
                                placeholder="Describe the sighting to the best of your ability."
                                value={this.state.desc}
                                className={classes.textField}
                                onChange={this.handleChange('desc')}
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Button variant="contained" type="submit" color="primary" className={classes.button}>
                                    Submit
                                </Button>
                            </Grid>
                    </Grid>
                        </Grid>
                    <Grid item xs={6}>
                        <MapContainer onClick={this.getCoordinates}/>
                    </Grid>
                </Grid>
            </form>
        </Fragment>
    );
  }  
}

ReportForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportForm);