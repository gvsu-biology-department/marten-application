import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import FlameLinkComponentCreations from '../components/FlameLinkComponentCreations';
import flamelinkApp from '../flamelink.js';

class Info extends Component {
    constructor() {
        super();

        global.schemaName = 'martenSchemaDemo';

        this.state = {
          schemaDetails: '',
        }

        flamelinkApp.schemas.getFields(global.schemaName, { fields: [ 'title', 'key', 'type', 'gridColumns', 'description', 'options' ] })
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
                    <FlameLinkComponentCreations schemaDetails = {this.state.schemaDetails}/>
                </Fragment>
          
            </div>
        );
    }
}

export default Info;
