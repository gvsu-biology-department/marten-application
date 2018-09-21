import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  dense: {
    marginTop: 30,
  },
  menu: {
    width: 200,
  },
});

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

class ReportForm extends React.Component {
  state = {
    date: formatDate(new Date()),
    time: '00:00',
    multiline: 'Controlled',
    type: '',
    confidence: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="select-sighting-type"
          select
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
          margin="normal"
          variant="outlined"
        >
          {sightingTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="select-confidence"
          select
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
          margin="normal"
          variant="outlined"
        >
          {confidenceLevels.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
            id="sighting-date"
            label="Sighting date"
            type="date"
            value={this.state.date}
            className={classes.textField}
            onChange={this.handleChange('date')}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="sighting-time"
            label="Sighting time"
            type="time"
            value={this.state.time}
            className={classes.textField}
            onChange={this.handleChange('time')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        <TextField
          id="sighting-description"
          label="Description"
          multiline
          rows="5"
          placeholder="Describe the sighting to the best of your ability."
          defaultValue=""
          className={classes.textField}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
}

ReportForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportForm);