import React, { Component} from 'react';
import FlameLinkStructure from './FlameLinkStructure';
import Grid from '@material-ui/core/Grid';
import flamelinkApp from '../flamelink.js';

class Layout extends Component {

    getSchemaFieldData(schemaData){
        var arr = [];
        for (var val in schemaData){
            arr.push(val);
        }
        return arr.map(this.createComponents, schemaData);
    }

    createComponents(num){
        return <FlameLinkStructure field={this[num]} type={this[num].type}/>
    }

    render() {
        return(
                <Grid container>
                    {this.getSchemaFieldData(this.props.schemaDetails)}
                </Grid>
        );
    }
}

export default Layout;