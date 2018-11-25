import { Component } from 'react';
import flamelinkApp from '../flamelink.js';
import '../css/FlameLink.css';

class FlameLinkCollectionGalleryContent extends Component {
    constructor(props) {
        super(props);

        global.galleryImages = [];

        this.state = {
            mediaURL: '',
        }

        flamelinkApp.storage.getURL(global.mediaIDs[this.props.num])
            .then(url => this.setState({
                mediaURL: url
            }))
    }

    addURLs = () => {
        if (this.state.mediaURL === '') {
        } else {
            var element = {}
            element.original = this.state.mediaURL;
            global.galleryImages.push(element);
        }
        
        return null;
    }

    render() {
        return this.addURLs();
    }
}

export default FlameLinkCollectionGalleryContent;