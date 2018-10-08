import React, { Component } from 'react';
import ViewSightings from '../components/ViewSightings.js';
import Typography from '@material-ui/core/Typography';

class Sighting extends Component {
    render() {
        return (
            <Typography variant='display1' align='center' gutterBottom>
                <ViewSightings/>
            </Typography>
        );
    }
}

export default Sighting;
