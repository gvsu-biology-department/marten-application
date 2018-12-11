import React, { Component } from 'react';
import FlameLinkStructure from './FlameLinkStructure';
import FlameLinkCollection from './FlameLinkCollection';
import Grid from '@material-ui/core/Grid';

class FlameLinkComponentCreations extends Component {

    getSchemaFieldData(schemaData, schemaType) {
        var arr = [];
        for (var val in schemaData) {
            arr.push(val);
        }

        if (schemaType === 'single') {
            return arr.map(this.createSingleTypeSchemaComponents, schemaData);
        }
        if (schemaType === 'collection') {
            return this.createCollectionTypeSchemaComponents(schemaData);
        }
        else {
            return
        }
    }

    createSingleTypeSchemaComponents(num) {
        return <FlameLinkStructure schemaData={this} field={this[num]} type={this[num].type} key={this[num].key} />
    }

    createCollectionTypeSchemaComponents = schemaData => {
        return <FlameLinkCollection schemaName={this.props.schemaName} schemaData={schemaData} />
    }

    render() {
        return (
            <Grid container>
                {this.getSchemaFieldData(this.props.schemaDetails, this.props.schemaType)}
            </Grid>
        );
    }
}

export default FlameLinkComponentCreations;