import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import '../../css/FlameLink.css';

class RenderGallery extends Component {
    constructor() {
        super();

        this.state = {
            showThumbnails: false,
            mounted: false,
            autoPlay: true,
            slideInterval: 6000,
        }
    }

    componentDidMount() {
        this.setState({ mounted: true })
    }

    _onImageLoad = event => {
        console.debug('loaded image', event.target.src);
    }

    render() {
        return (
            <ImageGallery
                items={global.galleryImages}
                showThumbnails={this.state.showThumbnails}
                onImageLoad={this._onImageLoad}
                autoPlay={this.state.autoPlay}
                slideInterval={this.state.slideInterval}
            />
        );
    }
}

export default RenderGallery;