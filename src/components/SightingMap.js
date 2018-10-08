import React, { Component, Fragment } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Typography from '@material-ui/core/Typography';
import firebase from '../firebase.js';

// Google Maps API Key
const API_KEY = 'AIzaSyAZ_0J01bA6wCbIPK4UBq2RUBC-hIqG4mM';

// Map container styles
const mapStyles = {
    width: '100%',
    height: '100%'
}

export class MapContainer extends Component {

    // Get the user's location using Google's geolocation
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                        myLatLng: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }
                );
            })
        } else {
            // If browser doesn't support geolocation or if user does not allow it, 
            // center map on Grand Rapids, Michigan
            this.setState({
                    myLatLng: {
                        lat: 42.9634,
                        lng: 85.6681
                    }
                }
            );
        }
    }

    // When the component has mounted to the DOM, get the user's location
    componentDidMount() {
        this.getLocation();

        const sightingsRef = firebase.database().ref('sightings');

        sightingsRef.on('value', (snapshot) => {
            let sightings = snapshot.val();
            let newState = [];
            for (let sighting in sightings) {
                newState.push({
                    id: sighting,
                    lat: sightings[sighting].lat,
                    lng: sightings[sighting].lng,
                    desc: sightings[sighting].desc,
                    type: sightings[sighting].type,
                    confidence: sightings[sighting].confidence,
                    date: sightings[sighting].date,
                    time: sightings[sighting].time
                });
            }
            this.setState({
                sightings: newState
            });
        });
    }

    // When the user clicks on a marker, pass the props related to that marker
    // and show the related info window
    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClick = (props, map, e) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    // Set the state of the component to contain user coordinates and initial 
    // marker and info window information
    state = {
        myLatLng: {
            lat: 42.9634,
            lng: 85.6681
        },
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        sightings: []
    }

    render() {
        return (
            // Render the Google Map, Marker, and InfoWindow components
            <div className = "sighting-google-map-container">
                <Map
                    style = { mapStyles }
                    google = { this.props.google }
                    initialCenter = { this.state.myLatLng }
                    center = { this.state.myLatLng }
                    defaultZoom = { 15 }
                    onClick = { this.onMapClick } >

                    <Marker 
                        position = { this.state.myLatLng }
                        onClick = { this.onMarkerClick }
                        type = { 'You are here' } 
                    />

                    { this.state.sightings.map((sighting) => {
                        return (
                            <Marker
                                key={ sighting.id }
                                position={{ lat: sighting.lat, lng:sighting.lng }}
                                onClick = { this.onMarkerClick }
                                type = { 'Type: ' + sighting.type }
                                confidence = { 'Confidence: ' + sighting.confidence }
                                date = { 'Date: ' + sighting.date }
                                time = { 'Time: ' + sighting.time }
                                description = { 'Description: ' + sighting.desc }
                            />
                        )
                    })}

                    <InfoWindow
                        marker = { this.state.activeMarker }
                        visible = { this.state.showingInfoWindow } >

                        <Fragment>
                            <Typography variant = "display1" gutterBottom>
                                { this.state.selectedPlace.type }
                            </Typography>
                            <Typography variant = "subheading" gutterBottom>
                                { this.state.selectedPlace.confidence }
                            </Typography>
                            <Typography variant = "subheading" gutterBottom>
                                { this.state.selectedPlace.date }
                            </Typography>
                            <Typography variant = "subheading" gutterBottom>
                                { this.state.selectedPlace.time }
                            </Typography>
                            <Typography variant = "subheading" gutterBottom>
                                { this.state.selectedPlace.description }
                            </Typography>
                        </Fragment>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

// Send the Google Map API Key with the MapContainer component
export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)