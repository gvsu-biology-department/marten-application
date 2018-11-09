import React, { Component } from 'react';
import ViewSightings from '../components/ViewSightings.js';

class Sighting extends Component {
    componentDidMount() {
        document.title = 'Marten Tracker | List';
    }

    render() {
        return (
            <ViewSightings/>
        );
    }
}

export default Sighting;
