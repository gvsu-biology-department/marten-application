import React, { Component, Fragment } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Typography from '@material-ui/core/Typography';

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
    
    // When the user clicks on the map, if a info window is visible then close it
    // and 'unactive' that marker
    onMapClick = (props, map, e) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }

        this.setState({
            markerLatLng: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            }
        })

        let lat = e.latLng.lat();
        let lng =  e.latLng.lng();

        if (this.props.onClick) {
            this.props.onClick(lat,lng);
        }
    }

    // Set the state of the component to contain user coordinates and initial 
    // marker and info window information
    state = {
        myLatLng: {
            lat: 42.9634,
            lng: 85.6681
        },
        markerLatLng: {
            lat: 0,
            lng: 0
        },
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    render() {

        return (
            // Render the Google Map, Marker, and InfoWindow components
            <div className = "report-google-map-container">
                <Map
                    style = { mapStyles }
                    google = { this.props.google }
                    initialCenter = { this.state.myLatLng }
                    center = { this.state.myLatLng }
                    defaultZoom = { 15 }
                    onClick = { this.onMapClick } >

                    <Marker 
                        position = { this.state.markerLatLng }
                    />

                    <Marker 
                        position = { this.state.myLatLng }
                        onClick = { this.onMarkerClick }
                        title = { 'You are here' }
                        name = { '' } 
                    />

                    <InfoWindow
                        marker = { this.state.activeMarker }
                        visible = { this.state.showingInfoWindow } >

                        <Fragment>
                            <Typography variant = "display1" gutterBottom>
                                { this.state.selectedPlace.title }
                            </Typography>
                            <Typography variant = "subheading" gutterBottom>
                                { this.state.selectedPlace.name }
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