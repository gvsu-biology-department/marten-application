import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FlameLinkCollectionStructure from './FlameLinkCollectionStructure';

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
        return (
                <Grid container>
                    {this.createCollectionEntries(this.props.schemaData, this.props.schemaContent, this.props.arr)}
                </Grid>
        );
    }
}

export default FlameLinkCollectionComponentCreations;