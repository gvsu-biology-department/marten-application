import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import firebase from '../firebase.js';
import GoogleMap from '../components/ReportMap';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

/**
 * Styles that the different
 * Material UI components pull
 * in. Mostly used for spacing.
 */
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        flexBasis: 280,
        width: '90%'
    },
    button: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
    },
    dense: {
        marginTop: 30,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
    icon: {
        fontSize: 20,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    menu: {
        width: 200,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    }
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
 * Types of sightings. Label is what is
 * viewed in the application, value is
 * what is stored in the database.
*/
const monthTypes = [
    {
        value: '01',
        label: 'January',
    },
    {
        value: '02',
        label: 'February',
    },
    {
        value: '03',
        label: 'March',
    },
    {
        value: '04',
        label: 'April',
    },
    {
        value: '05',
        label: 'May',
    },
    {
        value: '06',
        label: 'June',
    },
    {
        value: '07',
        label: 'July',
    },
    {
        value: '08',
        label: 'August',
    },
    {
        value: '09',
        label: 'September',
    },
    {
        value: '10',
        label: 'October',
    },
    {
        value: '11',
        label: 'November',
    },
    {
        value: '12',
        label: 'December',
    },
];

/** 
 * Types of sightings. Label is what is
 * viewed in the application, value is
 * what is stored in the database.
*/
const timeTypes = [
    {
        value: 'unknown',
        label: 'Unknown',
    },
    {
        value: 'morning',
        label: 'Morning',
    },
    {
        value: 'midday',
        label: 'Midday',
    },
    {
        value: 'evening',
        label: 'Evening',
    },
    {
        value: 'night',
        label: 'Night',
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
        label: '1 - Strongly disagree',
    },
    {
        value: '2',
        label: '2 - Disagree',
    },
    {
        value: '3',
        label: '3 - Neutral',
    },
    {
        value: '4',
        label: '4 - Agree',
    },
    {
        value: '5',
        label: '5 - Strongly agree',
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
    * Function for formatting the
    * year as a string that
    * Material UI can use.
    * @param {*} date, Date passed in. 
    */
    getYear = date => {
        var d = new Date(date),
            year = d.getFullYear();

        return year;
    }

    /**
    * Function for formatting the
    * month as a string that
    * Material UI can use.
    * @param {*} date, Date passed in. 
    */
    getMonth = date => {
        var d = new Date(date),
            month = d.getMonth() + 1;

        month = month.toString();

        if (month.length === 1) {
            month = "0" + month;
        }

        return month;
    }

    /**
     * State of form components.
     */
    state = {
        month: this.getMonth(new Date()),
        year: this.getYear(new Date()),
        time: 'unknown',
        type: 'visual',
        confidence: '1',
        desc: '',
        lat: '',
        lng: '',
        open: false,
        openModal: false, 
        hasModalOpened: false
    };

    handleModalOpen = () => !this.state.hasModalOpened ? this.setState({ openModal: true, hasModalOpened: true }) : null;

    handleModalClose = () => {
        this.setState({ openModal: false });
    };

    getModalStyle = () => {
        return {
            top: `25%`,
            left: `75%`,
            transform: `translate(-25%, -75%)`,
        };
    }

    /**
     * Handles state change in form
     * components.
     */
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    /**
     * Handles closing the toast.
     */
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    /*
    * Get the coordinates 
    * 
    */
    getCoordinates = (lat, lng) => {
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
            date: this.state.year + '-' + this.state.month,
            time: this.state.time,
            desc: this.state.desc,
            lat: this.state.lat,
            lng: this.state.lng
        }
        sightingsRef.push(sighting);
        this.setState({
            year: this.getYear(new Date()),
            month: this.getMonth(new Date()),
            time: 'unknown',
            type: 'visual',
            confidence: '1',
            desc: '',
            lat: '',
            lng: '',
            open: true
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
                        <Grid item xs={12} md={6}>
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
                                        helperText="I am confident of my marten sighting"
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
                                        id="sighting-time"
                                        select
                                        required
                                        label="Sighting time"
                                        name="sighting-time"
                                        className={classes.textField}
                                        value={this.state.time}
                                        onChange={this.handleChange('time')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                    >
                                        {timeTypes.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="sighting-month"
                                        select
                                        required
                                        label="Sighting month"
                                        name="sighting-month"
                                        className={classes.textField}
                                        value={this.state.month}
                                        onChange={this.handleChange('month')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                    >
                                        {monthTypes.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="sighting-year"
                                        required
                                        label="Sighting year"
                                        name="sighting-year"
                                        value={this.state.year}
                                        type="number"
                                        className={classes.textField}
                                        onChange={this.handleChange('year')}
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
                        <Grid item xs={12} md={6} onMouseEnter={this.handleModalOpen}>
                            <GoogleMap onClick={this.getCoordinates}/>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.openModal}
                                onClose={this.handleModalClose}
                            >
                                <div style={this.getModalStyle()} className={classes.paper}>
                                    <Typography variant="title" id="modal-title">
                                        Need a little help?
                                    </Typography>
                                    <Typography variant="subheading" id="simple-modal-description">
                                        Click on the map to drop a pin!
                                    </Typography>
                                </div>
                            </Modal>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id" className={classes.message}><CheckCircleIcon className={classes.icon} />Report received.</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </Fragment>
        );
    }
}

ReportForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportForm);