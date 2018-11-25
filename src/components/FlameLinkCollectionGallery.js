import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import RenderGallery from './RenderGallery';
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

    flamelinkGallery: {
        marginRight: "auto",
        marginLeft: "auto",
    },

    flamelinkGalleryContainer: {
        backgroundColor: 'black',
        marginTop: 20,
    },
});

class FlameLinkCollectionGallery extends Component {
    constructor(props) {
        super(props);

        global.mediaURLs = [];
        global.mediaIDs = [];

        this.state = {
            schemaDetails: '',
            schemaContent: '',
            schemaDescription: '',
        }

        flamelinkApp.schemas.getFields(this.props.galleryName, { fields: ['title', 'key', 'type', 'gridColumns', 'description', 'options'] })
            .then(result => this.setState({
                schemaDetails: result
            }))

        flamelinkApp.content.get(this.props.galleryName)
            .then(result => this.setState({
                schemaContent: result
            }))

        if (this.props.showTitle === false) {
        } else {
            flamelinkApp.schemas.get(this.props.galleryName)
                .then(result => this.setState({
                    schemaDescription: result.title
                }))
        }
    }

    getGalleryInfo(schemaDetails, schemaContent) {
        var key;
        var mediaNums = []
        for (var val in schemaDetails) {
            key = schemaDetails[val].key
        }
        for (var val1 in schemaContent) {
            for (var val2 in schemaContent[val1][key]) {
                global.mediaIDs.push(schemaContent[val1][key][val2]);
            }
        }
        for (var val3 in global.mediaIDs) {
            mediaNums.push(val3)
        }
        return mediaNums.map(this.createGallery);
    }

    createGallery(num) {
        return <FlameLinkCollectionGalleryContent num={num} key={global.mediaIDs[num]} />
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                {this.getGalleryInfo(this.state.schemaDetails, this.state.schemaContent)}
                <Typography variant='display3' className={classes.flamelinkItem}>
                    {this.state.schemaDescription}
                </Typography>
                <Grid container className={classes.flamelinkGalleryContainer}>
                    <Grid item lg={8} md={8} sm={12} xs={12} className={classes.flamelinkGallery} >
                        <RenderGallery key={Math.random()} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(FlameLinkCollectionGallery);