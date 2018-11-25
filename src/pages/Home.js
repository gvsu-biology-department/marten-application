import React, { Component } from 'react';
import FlameLinkComponentCreations from '../components/FlameLinkComponentCreations';
import FlameLinkCollectionGallery from '../components/FlameLinkCollectionGallery';
import flamelinkApp from '../flamelink';
import Grid from '@material-ui/core/Grid';

class Home extends Component {
    constructor() {
        super();

        global.schemaName = 'martenHome';

        this.state = {
            schemaDetails: '',
            schemaType: '',
        }

        flamelinkApp.schemas.getFields(global.schemaName, { fields: [ 'title', 'key', 'type', 'gridColumns', 'description', 'options'] })
            .then(result => this.setState({
                schemaDetails: result
            }))

        flamelinkApp.schemas.get(global.schemaName)
            .then(result => this.setState({
              schemaType: result.type
            }))
    }

    componentDidMount() {
        document.title = 'Marten Tracker | Home';
    }

    render() {
        return (
            <Grid container>
                <FlameLinkCollectionGallery galleryName={'martenHomeGallery'} showTitle={false}/>
                <FlameLinkComponentCreations schemaDetails={this.state.schemaDetails} schemaType = {this.state.schemaType}/>
            </Grid>
        );
    }
}

export default Home;
