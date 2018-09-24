import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const styles = ({
    map: {
        height: '92vh'
    }
});

export default class Map extends Component {

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
                        lat: 42.96,
                        lng: 85.66
                    }
                }
            );
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    state = {
        myLatLng: {
            lat: 42.96,
            lng: 85.66
        }
    }

    static defaultProps = {
        zoom: 15
    }

    render() {
        return (
            <div className='google-map' style={ styles.map }>
                <GoogleMapReact
                    initialCenter={ this.state.myLatLng }
                    center={ this.state.myLatLng }
                    defaultZoom={ this.props.zoom }>
                </GoogleMapReact>
            </div>
        );
    }
}