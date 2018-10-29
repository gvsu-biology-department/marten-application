import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// Google Maps API Key
const API_KEY = 'AIzaSyAZ_0J01bA6wCbIPK4UBq2RUBC-hIqG4mM';

// Map container styles
const mapStyles = {
    width: '100%',
    height: '100%'
}

export class MapContainer extends Component {

    render() {
        return (
            // Render the Google Map, Marker, and InfoWindow components
            <div className = "sighting-detail-google-map-container">
                <Map
                    style = { mapStyles }
                    google = { this.props.google }
                    initialCenter = {{ lat: this.props.lat, lng: this.props.lng }}
                    center = {{ lat: this.props.lat, lng: this.props.lng }}
                    defaultZoom = { 15 }>

                    <Marker 
                        position = {{ lat: this.props.lat, lng: this.props.lng }}
                    />
                </Map>
            </div>
        );
    }
}

// Send the Google Map API Key with the MapContainer component
export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)