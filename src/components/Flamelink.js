import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import flamelinkApp from '../flamelink.js';
import Layout from './Layout';
class Flamelink extends Component {
    constructor() {
        super();

        this.state = {
          schemaDetails: ''
        }
      }

    componentDidMount() {
        // fetch the project name, once it retrieves resolve the promsie and update the state. 
        flamelinkApp.schemas.getFields('martenSchemaDemo', { fields: [ 'title', 'key' ] })
        .then(result => this.setState({
          schemaDetails: result
        }))
      }

    render() {

        return(
            <Fragment>
                <Layout schemaDetails = {this.state.schemaDetails}/>
            </Fragment>
        );
    }
}

export default Flamelink;