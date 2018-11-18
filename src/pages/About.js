import React, { Component, Fragment } from 'react';
import FlameLinkComponentCreations from '../components/FlameLinkComponentCreations';
import flamelinkApp from '../flamelink.js';

class About extends Component {
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
                <Fragment>
                    <FlameLinkComponentCreations schemaDetails = {this.state.schemaDetails}/>
                </Fragment>
          
            </div>
        );
    }
}

export default About;
