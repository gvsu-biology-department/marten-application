import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Typography from '@material-ui/core/Typography';

const API_KEY = 'AIzaSyAZ_0J01bA6wCbIPK4UBq2RUBC-hIqG4mM';

const style = {
    width: '100%',
    height: '100%'
}

export class MapContainer extends Component {

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
            // If browser doesn't support geolocation, center map on 
            // Grand Rapids, Michigan
            this.setState({
                    myLatLng: {
                        lat: 42.9634,
                        lng: 85.6681
                    }
                }
            );
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    
    onMapClick = () => {
            if (this.state.showingInfoWindow) {
                this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    state = {
        myLatLng: {
            lat: 42.9634,
            lng: 85.6681
        },
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    render() {
        return (
            <Map
                style={ style }
                google={ this.props.google }
                initialCenter={ this.state.myLatLng }
                center={ this.state.myLatLng }
                defaultZoom={ 15 }
                onClick = { this.onMapClick } >

                <Marker 
                    position={ this.state.myLatLng }
                    onClick = { this.onMarkerClick }
                    title = { 'Title 1!' }
                    name = { 'Name 1!' } 
                />
                <Marker 
                    position={{ lat: 46.5089994, lng: -122.8543421 }}
                    onClick = { this.onMarkerClick }
                    title = { 'Title 2!' }
                    name = { 'Name 2!' } 
                />

                <InfoWindow
                    marker = { this.state.activeMarker }
                    visible = { this.state.showingInfoWindow } >
                    <Typography variant="display1" gutterBottom>
                        { this.state.selectedPlace.title }
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                        { this.state.selectedPlace.name }
                    </Typography>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)