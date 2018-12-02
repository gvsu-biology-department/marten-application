import React, { Component, Fragment } from 'react';
import Disqus from 'disqus-react';
import moment from 'moment';
import SightingDetailMap from './SightingDetailMap';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
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

class SightingDetail extends Component {

    /**
    * Gets formatted type value.
    */
    getType = item => {
        for (var i = 0; i < sightingTypes.length; i++) {
            if (sightingTypes[i].value === item) {
                return sightingTypes[i].label;
            }
        }
    }


    /**
     * Gets formatted time value.
     */
    getTime = item => {
        for (var i = 0; i < timeTypes.length; i++) {
            if (timeTypes[i].value === item) {
                return timeTypes[i].label;
            }
        }
    }

    /**
    * Gets formatted confidence value.
    */
    getConfidence = item => {
        for (var i = 0; i < confidenceLevels.length; i++) {
            if (confidenceLevels[i].value === item) {
                return confidenceLevels[i].label;
            }
        }

    }

    formatDate = date => {
        return (moment(date, "YYYY-MM").format("MMMM YYYY").toString());
    }

    render() {
        const disqusShortname = 'marten-tracker';
        const disqusConfig = {
            url: `http://localhost:3000/${this.props.detail.id}`,
            identifier: this.props.detail.id,
            title: this.props.detail.id
        };

        return (
            <Fragment>
                <SightingDetailMap lat={this.props.detail.lat} lng={this.props.detail.lng} />
                <Typography component="div">
                <div className='sighting-details-content'>
                    <p><b>Type:</b> {this.getType(this.props.detail.type)}</p>
                    <p><b>When:</b> {this.formatDate(this.props.detail.date)}, {this.getTime(this.props.detail.time)}</p>
                    <p><b>Where:</b> {this.props.detail.lat} degrees N, and {this.props.detail.lng} degrees E</p>
                    <p><b>I am confident of my sighting:</b> {this.getConfidence(this.props.detail.confidence)}</p>
                    <hr />
                    <p>{`${this.props.detail.desc}`}</p>
                </div>
                    <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                </Typography>
            </Fragment>
        );
    }
}

SightingDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SightingDetail);