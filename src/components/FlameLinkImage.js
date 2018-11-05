import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import flamelinkApp from '../flamelink.js';


class FlameLinkImage extends Component {
    constructor() {
        super();

        this.state = {
          mediaURL: '',
        }

        flamelinkApp.storage.getURL(global.mediaID)
                    .then(url => this.setState({
                      mediaURL: url
                    }))
      }

    render() {
        return(
                <Typography align='center'>
                    <img src={this.state.mediaURL} width="70%" alt='' />
                </Typography>
        );
    }
}

export default FlameLinkImage;