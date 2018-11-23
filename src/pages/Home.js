import React, { Component } from 'react';
import FlameLinkComponentCreations from '../components/FlameLinkComponentCreations';
import flamelinkApp from '../flamelink';

class Home extends Component {
    constructor() {
        super();

        global.schemaName = 'martenHome';

        this.state = {
            schemaDetails: '',
            schemaType: '',
        }

        flamelinkApp.schemas.getFields(global.schemaName, { fields: [ 'title', 'key', 'type', 'gridColumns', 'description', 'options'] })
            .then(result => this.setState({
                schemaDetails: result
            }))

        flamelinkApp.schemas.get(global.schemaName)
            .then(result => this.setState({
              schemaType: result.type
            }))
    }

    render() {
        return (
            <FlameLinkComponentCreations schemaDetails={this.state.schemaDetails} schemaType = {this.state.schemaType}/>
        );
    }
}

export default Home;
