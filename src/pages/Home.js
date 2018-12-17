import React, { Component } from 'react';
import FlameLinkComponentCreations from '../components/flamelink/FlameLinkComponentCreations';
import FlameLinkCollectionGallery from '../components/flamelink/FlameLinkCollectionGallery';
import flamelinkApp from '../utilities/flamelink';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    header: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
    },
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schemaNameHistory: 'martenHomeHistory',
            schemaDetailsHistory: '',
            schemaTypeHistory: '',

            schemaNameInformation: 'martenHomeInformation',
            schemaDetailsInformation: '',
            schemaTypeInformation: '',

            schemaNameSimilarSpecies: 'martenHomeSimilarSpecies',
            schemaDetailsSimilarSpecies: '',
            schemaTypeSimilarSpecies: '',
        }

        flamelinkApp.schemas.getFields(this.state.schemaNameHistory, { fields: [ 'title', 'key', 'type', 'gridColumns', 'description', 'options'] })
            .then(result => this.setState({
                schemaDetailsHistory: result
            }))

        flamelinkApp.schemas.get(this.state.schemaNameHistory)
            .then(result => this.setState({
              schemaTypeHistory: result.type
            }))

        flamelinkApp.schemas.getFields(this.state.schemaNameInformation, { fields: [ 'title', 'key', 'type', 'gridColumns', 'description', 'options'] })
            .then(result => this.setState({
                schemaDetailsInformation: result
            }))

        flamelinkApp.schemas.get(this.state.schemaNameInformation)
            .then(result => this.setState({
              schemaTypeInformation: result.type
            }))

        flamelinkApp.schemas.getFields(this.state.schemaNameSimilarSpecies, { fields: [ 'title', 'key', 'type', 'gridColumns', 'description', 'options'] })
            .then(result => this.setState({
                schemaDetailsSimilarSpecies: result
            }))

        flamelinkApp.schemas.get(this.state.schemaNameSimilarSpecies)
            .then(result => this.setState({
              schemaTypeSimilarSpecies: result.type
            }))
    }

    componentDidMount() {
        document.title = 'Marten Tracker | Home';
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                <FlameLinkCollectionGallery galleryName={'martenHomeGallery'} showTitle={false}/>

                <Typography variant="display1" className={classes.header}>History of martens in Michigan’s Lower Peninsula</Typography>
                <FlameLinkComponentCreations schemaDetails={this.state.schemaDetailsHistory} schemaType={this.state.schemaTypeHistory} schemaName={this.state.schemaNameHistory} />

                <Typography variant="display1" className={classes.header}>Marten information</Typography>
                <FlameLinkComponentCreations schemaDetails={this.state.schemaDetailsInformation} schemaType={this.state.schemaTypeInformation} schemaName={this.state.schemaNameInformation} />

                <Typography variant="display1" className={classes.header}>Similar species that might be confused with martens in Michigan</Typography>
                <FlameLinkComponentCreations schemaDetails={this.state.schemaDetailsSimilarSpecies} schemaType={this.state.schemaTypeSimilarSpecies} schemaName={this.state.schemaNameSimilarSpecies} />
            </Grid>
        );
    }
}

export default withStyles(styles)(Home);
