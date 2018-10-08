import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Flamelink from '../components/Flamelink';


class Info extends Component {
    render() {
        
        return (
            <div>
                
                <Typography variant='display1' align='center' gutterBottom>
                    Info
                </Typography>
                <Flamelink/>
          
            </div>
        );
    }
}

export default Info;
