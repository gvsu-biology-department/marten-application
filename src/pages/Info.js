import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout';
import flamelinkApp from '../flamelink.js';

class Info extends Component {
    constructor() {
        super();

        this.state = {
          schemaDetails: '',
        }

        flamelinkApp.schemas.getFields('martenSchemaDemo', { fields: [ 'title', 'key', 'type', 'gridColumns' ] })
        .then(result => this.setState({
          schemaDetails: result
        }))
      }

    render() {
        
        return (
            <div>
                
                <Typography variant='display1' align='center' gutterBottom>
                    Info
                </Typography>

                <Fragment>
                    <Layout schemaDetails = {this.state.schemaDetails}/>
                </Fragment>
          
            </div>
        );
    }
}

export default Info;
