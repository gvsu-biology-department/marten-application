import React, { Component, Fragment } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import firebase from '../firebase.js';

// Google Maps API Key
const API_KEY = 'AIzaSyAZ_0J01bA6wCbIPK4UBq2RUBC-hIqG4mM';

// Map container styles
const mapStyles = {
    width: '100%',
    height: '100%'
};

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
                });
            });
        } else {
            // If browser doesn't support geolocation or if user does not allow it, 
            // center map on Grand Rapids, Michigan
            this.setState({
                myLatLng: {
                    lat: 42.9634,
                    lng: 85.6681
                }
            });
        }
    }

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

    /**
     * Determines marker icon based on the
     * sighting type.
     */
    sightingIcon = (type) => {
        let pinIcon;

        switch(type) {
            case 'visual':
                pinIcon = '/mapicons/marten-icon.png';
                break;
            case 'roadkill':
                pinIcon = '/mapicons/tire-icon.png';
                break;
            case 'viewed_tracks':
                pinIcon = '/mapicons/paws.png';
                break;
            case 'trapped':
                pinIcon = '/mapicons/cage.png';
                break;
            case 'photo':
                pinIcon = '/mapicons/photo-icon.png';
                break;
            case 'other':
                pinIcon = '/mapicons/other-icon.png';
                break;
            default:
                break;
        }

        return pinIcon;
    }

    /**
     * Formats date using Moment.js.
     */
    formatDate = date => {
        return (moment(date, "YYYY-MM").format("MMMM YYYY").toString())
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
    };

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
<<<<<<< HEAD
                    minZoom={6}
                    zoom={6}
                    onClick={this.onMapClick} >
=======
                    defaultZoom={15}
                    onClick={this.onMapClick}
                >
>>>>>>> 80a73145f79c96ee62e901f94528550ad8761cca

                    <Marker
                        position={this.state.myLatLng}
                        onClick={this.onMarkerClick}
                        type={'You are here'}
                    />

                    {this.state.sightings.map((sighting) => {

                        let pinIcon = this.sightingIcon(sighting.type)
                        
                        return (
                            <Marker
                                key={sighting.id}
                                position={{ lat: sighting.lat, lng: sighting.lng }}
                                onClick={this.onMarkerClick}
                                type={'Type: ' + this.getType(sighting.type)}
                                date={<Fragment><b>Date:</b> {this.formatDate(sighting.date)}</Fragment>}
                                time={<Fragment><b>Time:</b> {this.getTime(sighting.time)}</Fragment>}
                                confidence={<Fragment><b>I am confident of my sighting:</b> {this.getConfidence(sighting.confidence)}</Fragment>}
                                description={<Fragment><b>Description:</b> {sighting.desc}</Fragment>}
                                icon={{
                                    url: pinIcon,
                                    anchor: new google.maps.Point(32,32),
                                    scaledSize: new google.maps.Size(32,32)
                                }}
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
                                {this.state.selectedPlace.date}
                            </Typography>
                            <Typography variant="subheading" gutterBottom>
                                {this.state.selectedPlace.time}
                            </Typography>
                            <Typography variant="subheading" gutterBottom>
                                {this.state.selectedPlace.confidence}
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
export default GoogleApiWrapper({ apiKey: (API_KEY) })(MapContainer);