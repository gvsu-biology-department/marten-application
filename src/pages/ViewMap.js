import React, { Component } from 'react';
import GoogleMap from '../components/SightingMap';

class Sighting extends Component {
    render() {
        return (
            <div className='sighting-map'>
                <GoogleMap/>
            </div>
        );
    }
}

export default Sighting;