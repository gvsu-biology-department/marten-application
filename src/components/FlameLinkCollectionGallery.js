import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import flamelinkApp from '../flamelink.js';
import FlameLinkCollectionGalleryContent from './FlameLinkCollectionGalleryContent';
import "react-image-gallery/styles/css/image-gallery.css";
import '../css/FlameLink.css';

const styles = theme => ({
        flamelinkItem: {
            marginRight: 20,
            marginLeft: 20,
            marginTop: 20,
        },
    });

class FlameLinkCollectionGallery extends Component {
    constructor() {
        super();

        global.mediaURLs = [];
        global.mediaIDs = [];
        global.galleryImages = [];

        this.state = {
            schemaDetails: '',
            schemaContent: '',
            schemaDescription: '',
            showThumbnails: false,
            showIndex: true,
        }

        flamelinkApp.schemas.getFields(global.galleryName, { fields: [ 'title', 'key', 'type', 'gridColumns', 'description', 'options'] })
                    .then(result => this.setState({
                        schemaDetails: result
                    }))

        flamelinkApp.content.get(global.galleryName)
            .then(result => this.setState({
              schemaContent: result
            }))

        flamelinkApp.schemas.get(global.galleryName)
            .then(result => this.setState({
              schemaDescription: result.title
            }))
    }

    getGalleryInfo(schemaDetails, schemaContent){
        var key;
        var mediaNums = []
        for (var val in schemaDetails){
            key = schemaDetails[val].key
        }  
        for (var val1 in schemaContent){
            for (var val2 in schemaContent[val1][key]){
                global.mediaIDs.push(schemaContent[val1][key][val2]);
            }
        }
        console.log('Global Media IDs: ', global.mediaIDs)
        for (var val3 in global.mediaIDs){
                mediaNums.push(val3)
        }   
        return mediaNums.map(this.createGallery);
    }

    createGallery(num){
         return <FlameLinkCollectionGalleryContent num={num} key={global.mediaIDs[num]}/>
    }

    render() {
        const { classes } = this.props;

        return(
                <Grid item lg={8} md={8} sm={12} xs={12} className={classes.flamelinkItem}>
                    <Typography variant='display3'>
                        {this.state.schemaDescription}
                    </Typography>
                    {this.getGalleryInfo(this.state.schemaDetails, this.state.schemaContent)}
                    {console.log('Gallery Images: ', global.galleryImages)}
                </Grid>
        );
    }
}

export default withStyles(styles)(FlameLinkCollectionGallery);