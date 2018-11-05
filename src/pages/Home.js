import React, { Component } from 'react';
import FlameLinkComponentCreations from '../components/FlameLinkComponentCreations';
import flamelinkApp from '../flamelink';

class Home extends Component {
    constructor() {
        super();

        global.schemaName = 'martenHome';

        this.state = {
            schemaDetails: '',
        }

        flamelinkApp.schemas.getFields(global.schemaName, { fields: ['title', 'key', 'type', 'gridColumns', 'description', 'options'] })
            .then(result => this.setState({
                schemaDetails: result
            }))
    }

    render() {
        return (
            <FlameLinkComponentCreations schemaDetails={this.state.schemaDetails} />
        );
    }
}

export default Home;
