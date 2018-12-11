import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FlameLinkCollectionStructure from './FlameLinkCollectionStructure';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        margin: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%'
    },
});

class FlameLinkCollectionComponentCreations extends Component {

    createCollectionEntries(schemaData, schemaContent, arr) {
        var collectionInfo = [schemaData, schemaContent];
        return arr.map(this.createCollectionComponents, collectionInfo);
    }

    createCollectionComponents(num) {
        return (
            <FlameLinkCollectionStructure schemaData={this[0]} schemaContent={this[1]} field={this[0][num]} type={this[0][num].type} key={this[0][num].key} />
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={4}>
                <Grid container>
                    {this.createCollectionEntries(this.props.schemaData, this.props.schemaContent, this.props.arr)}
                </Grid>
            </Paper>
        );
    }
}

FlameLinkCollectionComponentCreations.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlameLinkCollectionComponentCreations);