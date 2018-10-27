import React, { Component, Fragment } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import moment from 'moment'
import Typography from '@material-ui/core/Typography';
import firebase from '../firebase.js';

// Google Maps API Key
const API_KEY = 'AIzaSyAZ_0J01bA6wCbIPK4UBq2RUBC-hIqG4mM';

// Map container styles
const mapStyles = {
    width: '100%',
    height: '100%'
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

/**
 * Gets formatted confidence value.
 */
function getConfidence(item) {
    for (var i = 0; i < confidenceLevels.length; i++) {
        if (confidenceLevels[i].value === item) {
            return confidenceLevels[i].label;
        }
    }

}

/**
 * Gets formatted time value.
 */
function getTime(item) {
    for (var i = 0; i < timeTypes.length; i++) {
        if (timeTypes[i].value === item) {
            return timeTypes[i].label;
        }
    }
}

/**
 * Gets formatted type value.
 */
function getType(item) {
    for (var i = 0; i < sightingTypes.length; i++) {
        if (sightingTypes[i].value === item) {
            return sightingTypes[i].label;
        }
    }
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

<<<<<<< HEAD
    sightingIcon = (type) => {
        let pinIcon

        switch(type) {
            case 'visual':
                pinIcon = 'https://i.postimg.cc/nhYXGQNp/marten-icon.png'
                break
            case 'roadkill':
                pinIcon = 'https://i.postimg.cc/xdfcx1SH/tire-icon.png'
                break
            case 'viewed_tracks':
                pinIcon = 'https://i.postimg.cc/7P761WCS/paws.png'
                break
            case 'trapped':
                pinIcon = 'https://i.postimg.cc/Y9LSsXdK/cage.png'
                break
            default:
                break
        }

        return pinIcon
=======
    formatDate = date => {
        return (moment(date, "YYYY-MM").format("MMMM YYYY").toString())
>>>>>>> 48273519cbb4fe2cd134adbfa4e7814237f3021a
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
        const {google} = this.props;

        return (
            // Render the Google Map, Marker, and InfoWindow components
            <div className="sighting-google-map-container">
                <Map
                    style={mapStyles}
                    google={this.props.google}
                    initialCenter={this.state.myLatLng}
                    center={this.state.myLatLng}
                    defaultZoom={15}
                    onClick={this.onMapClick} >

                    <Marker
                        position={this.state.myLatLng}
                        onClick={this.onMarkerClick}
                        type={'You are here'}
                    />

<<<<<<< HEAD
                    { this.state.sightings.map((sighting) => {
                        
                        let pinIcon = this.sightingIcon(sighting.type)

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
                                icon={{
                                    url: pinIcon,
                                    anchor: new google.maps.Point(32,32),
                                    scaledSize: new google.maps.Size(32,32)
                                }}
=======
                    {this.state.sightings.map((sighting) => {
                        return (
                            <Marker
                                key = {sighting.id}
                                position = {{ lat: sighting.lat, lng: sighting.lng }}
                                onClick = {this.onMarkerClick}
                                type = {'Type: ' + getType(sighting.type)}
                                confidence = {<Fragment><b>Confidence:</b> {getConfidence(sighting.confidence)}</Fragment>}
                                date = {<Fragment><b>Date:</b> {this.formatDate(sighting.date)}</Fragment>}
                                time = {<Fragment><b>Time:</b> {getTime(sighting.time)}</Fragment>}
                                description = {<Fragment><b>Description:</b> {sighting.desc}</Fragment>}
>>>>>>> 48273519cbb4fe2cd134adbfa4e7814237f3021a
                            />
                        )
                    })}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow} >

                        <Fragment>
                            <Typography variant="display1" gutterBottom>
                                {this.state.selectedPlace.type}
                            </Typography>
                            <Typography variant="subheading" gutterBottom>
                                {this.state.selectedPlace.confidence}
                            </Typography>
                            <Typography variant="subheading" gutterBottom>
                                {this.state.selectedPlace.date}
                            </Typography>
                            <Typography variant="subheading" gutterBottom>
                                {this.state.selectedPlace.time}
                            </Typography>
                            <Typography variant="subheading" gutterBottom>
                                {this.state.selectedPlace.description}
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