import React, { Component } from 'react';
import GoogleMap from '../components/SightingMap';

class Sighting extends Component {
    componentDidMount() {
        document.title = 'Marten Tracker | Map';
    }

    render() {
        return (
            <div className='sighting-map'>
                <GoogleMap/>
            </div>
        );
    }
}

export default Sighting;