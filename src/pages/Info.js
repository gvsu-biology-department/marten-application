import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Flamelink from '../components/Flamelink';

class Info extends Component {
    render() {
        
        return (
            <div>
                <Flamelink flamelinkApp={this.props.flamelinkApp}/>
                <Typography variant='display1' align='center' gutterBottom>
                    Info
                </Typography>
                <p id="flamelinkDemo"></p>
          
            </div>
        );
    }
}

export default Info;
