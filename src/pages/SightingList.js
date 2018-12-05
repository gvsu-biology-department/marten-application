import React, { Component } from 'react';
import ViewSightings from '../components/list/ViewSightings.js';

class Sighting extends Component {
    componentDidMount() {
        document.title = 'Marten Tracker | List';
    }

    render() {
        return (
            <ViewSightings themeName={this.props.themeName}/>
        );
    }
}

export default Sighting;
