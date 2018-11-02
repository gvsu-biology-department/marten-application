import React, { Component} from 'react';
import FlameLinkStructure from './FlameLinkStructure';
import Grid from '@material-ui/core/Grid';

class FlameLinkComponentCreations extends Component {

    getSchemaFieldData(schemaData){
        var arr = [];
        for (var val in schemaData){
            arr.push(val);
        }
        return arr.map(this.createComponents, schemaData);
    }

    createComponents(num){
        return <FlameLinkStructure schemaData={this} field={this[num]} type={this[num].type} key={this[num].key} />
    }

    render() {
        return(
                <Grid container>
                    {this.getSchemaFieldData(this.props.schemaDetails)}
                </Grid>
        );
    }
}

export default FlameLinkComponentCreations;