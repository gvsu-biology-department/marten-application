import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import FlameLinkComponentCreations from '../components/FlameLinkComponentCreations';
import flamelinkApp from '../flamelink.js';

class Home extends Component {
    constructor() {
        super();

        global.schemaName = 'martenInfo';

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
                    Home
                </Typography>
                <Fragment>
                    <FlameLinkComponentCreations schemaDetails = {this.state.schemaDetails}/>
                </Fragment>
            </div>
        );
    }
}

export default Home;
