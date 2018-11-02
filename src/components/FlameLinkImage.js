import React, { Component } from 'react';
import flamelinkApp from '../flamelink.js';


class FlameLinkImage extends Component {
    constructor() {
        super();

        this.state = {
          mediaURL: '',
        }
      }

    getImage(imagePath){
            flamelinkApp.storage.getURL(imagePath)
                    .then(url => this.setState({
                      mediaURL: url
                    }))
            return <img src={this.state.mediaURL} max-width="500" width="100%" alt='' />
    }

    render() {
        return(
                <div>
                    {this.getImage(this.props.content)}
                </div>
        );
    }
}

export default FlameLinkImage;