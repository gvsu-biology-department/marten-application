import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import firebase from '../firebase.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SightingDetail from './SightingDetail';

class ViewSightings extends Component {

    componentDidMount() {
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

    getDetail = (id, lat, lng, desc, type, confidence, date, time) => {
        this.setState({
            selectedSighting: {
                id: id,
                lat: lat,
                lng: lng,
                desc: desc,
                type: type,
                confidence: confidence,
                date: date,
                time: time
            },
            clicked: true
        })
    }

    state = {
        sightings: [],
        selectedSighting: {
            id: null,
            lat: null,
            lng: null,
            desc: null,
            type: null,
            confidence: null,
            date: null,
            time: null
        },
        clicked: false
    }

    render() {
        return (
            <Fragment>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Fragment>
                            <List>
                            { 
                                this.state.sightings.map((sighting) => {
                                    return (
                                        <ListItem button key={ sighting.id } onClick={() => this.getDetail(sighting.id, sighting.lat, sighting.lng, sighting.desc, sighting.type, sighting.confidence, sighting.date, sighting.time)}>
                                            <ListItemIcon><HomeIcon/></ListItemIcon>
                                            <ListItemText primary={`${sighting.desc}`}/>
                                        </ListItem>
                                    )
                                })
                            }
                            </List>
                        </Fragment>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {this.state.clicked === true && <SightingDetail detail={ this.state.selectedSighting }/>}
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default ViewSightings;