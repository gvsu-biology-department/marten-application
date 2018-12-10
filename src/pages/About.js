import React, { Component, Fragment } from 'react';
import FlameLinkComponentCreations from '../components/flamelink/FlameLinkComponentCreations';
import flamelinkApp from '../utilities/flamelink.js';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    header: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
    },
});

class About extends Component {
    state = {
        researcherSchemaName: 'martenAbout',
        developerSchemaName: 'martenAboutDev',
        researcherSchemaDetails: '',
        researcherSchemaType: '',
        developerSchemaDetails: '',
        developerSchemaType: ''
    }

    componentDidMount() {
        document.title = 'Marten Tracker | About';
        
        
        // Pulling in schema details for researchers
        flamelinkApp.schemas.getFields(this.state.researcherSchemaName, { fields: ['title', 'key', 'type', 'gridColumns', 'description', 'options'] })
            .then(result => this.setState({
                researcherSchemaDetails: result
            }))

        flamelinkApp.schemas.get(this.state.researcherSchemaName)
            .then(result => this.setState({
                researcherSchemaType: result.type
            }))


        // Pulling in schema details for developers
        flamelinkApp.schemas.getFields(this.state.developerSchemaName, { fields: ['title', 'key', 'type', 'gridColumns', 'description', 'options'] })
            .then(result => this.setState({
                developerSchemaDetails: result
            }))

        flamelinkApp.schemas.get(this.state.developerSchemaName)
            .then(result => this.setState({
                developerSchemaType: result.type
            }))
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Typography variant="display1" className={classes.header}>Researchers</Typography>
                <FlameLinkComponentCreations schemaDetails={this.state.researcherSchemaDetails} schemaType={this.state.researcherSchemaType} schemaName={this.state.researcherSchemaName} />
                <Typography variant="display1" className={classes.header}>Developers</Typography>
                <FlameLinkComponentCreations schemaDetails={this.state.developerSchemaDetails} schemaType={this.state.developerSchemaType} schemaName={this.state.developerSchemaName} />
            </Fragment>
        );
    }
}

About.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
