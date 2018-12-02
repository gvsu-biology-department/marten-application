import React, { Component, Fragment } from 'react';
import FlameLinkComponentCreations from '../components/flamelink/FlameLinkComponentCreations';
import flamelinkApp from '../flamelink.js';

class About extends Component {
    constructor() {
        super();

        global.schemaName = 'martenAbout';

        this.state = {
          schemaDetails: '',
          schemaType: '',
        }

        flamelinkApp.schemas.getFields(global.schemaName, { fields: [ 'title', 'key', 'type', 'gridColumns', 'description', 'options' ] })
        .then(result => this.setState({
          schemaDetails: result
        }))
        
        flamelinkApp.schemas.get(global.schemaName)
        .then(result => this.setState({
          schemaType: result.type
        }))
    }

    componentDidMount() {
        document.title = 'Marten Tracker | About';
    }

    render() {
        
        return (
            <div>
                <Fragment>
                    <FlameLinkComponentCreations schemaDetails = {this.state.schemaDetails} schemaType = {this.state.schemaType}/>
                </Fragment>
            </div>
        );
    }
}

export default About;
