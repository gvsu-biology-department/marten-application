import React, { Component } from 'react';
import FlameLinkStructure from './FlameLinkStructure';
import FlameLinkCollection from './FlameLinkCollection';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        margin: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        boxSizing: 'borderBox'
    },
});

class FlameLinkComponentCreations extends Component {

    getSchemaFieldData(schemaData, schemaType) {
        var arr = [];
        var arr2 = [];
        for (var val in schemaData) {
            arr.push(val);
        }

        arr2.push(schemaData);
        arr2.push(this.props.schemaName);

        if (schemaType === 'single') {
            return arr.map(this.createSingleTypeSchemaComponents, arr2);
        }
        if (schemaType === 'collection') {
            return this.createCollectionTypeSchemaComponents(schemaData);
        }
        else {
            return
        }
    }

    createSingleTypeSchemaComponents(num) {
        return <FlameLinkStructure schemaName={this[1]} schemaData={this[0]} field={this[0][num]} type={this[0][num].type} key={this[0][num].key} />
    }

    createCollectionTypeSchemaComponents = schemaData => {
        return <FlameLinkCollection schemaName={this.props.schemaName} schemaData={schemaData} />
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={4}>
                <Grid container>
                    {this.getSchemaFieldData(this.props.schemaDetails, this.props.schemaType)}
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(FlameLinkComponentCreations);