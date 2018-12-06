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
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundImage: 'url(../images/galleryBackgroundImage.png)',
        overflow: 'hidden',
        minHeight: 180,
        minWidth:  300,
        width:     'auto',
        height:    'auto',
    },

    flamelinkGalleryContainer: {
        backgroundColor: 'black',
        marginTop: 20,
    },
    flamelinkGalleryInnerContainer: {
        maxHeight:   1000,
        minHeight:   180,
        height:      'auto',
        width:       'auto',
        marginRight: 'auto',
        marginLeft:  'auto',
    },
});

class FlameLinkCollectionGallery extends Component {
    getPageTitle = galleryName => {
        switch (galleryName) {
            case 'martensAndKits':
                document.title = 'Marten Tracker | Martens and Kits';
                break;
            case 'martensAtNight':
                document.title = 'Marten Tracker | Martens at Night';
                break;
            case 'martensBeingMartens':
                document.title = 'Marten Tracker | Martens Being Martens';
                break;
            default:
                document.title = 'Marten Tracker | Galleries';
                break;
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            schemaDetails: '',
            schemaContent: '',
            schemaDescription: '',
        };

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

        this.getPageTitle(this.props.galleryName);
    }

    getGalleryInfo(schemaDetails, schemaContent) {
        var key;
        var mediaNums = [];
        var mediaIDs = [];

        for (var val in schemaDetails) {
            key = schemaDetails[val].key
        }
        for (var val1 in schemaContent) {
            for (var val2 in schemaContent[val1][key]) {
                mediaIDs.push(schemaContent[val1][key][val2]);
            }
        }
        for (var val3 in mediaIDs) {
            mediaNums.push(val3)
        }

        return mediaNums.map(this.createGallery, mediaIDs);
    }

    createGallery(num) {
        if (num === '0') {
            global.galleryImages = [];
        }
        return <FlameLinkCollectionGalleryContent mediaIDs={this} num={num} key={this[num]} />;
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                {this.getGalleryInfo(this.state.schemaDetails, this.state.schemaContent)}
                <Typography variant='display2' className={classes.flamelinkItem}>
                    {this.state.schemaDescription}
                </Typography>
                <Grid container className={classes.flamelinkGalleryContainer}>
                    <Grid container className={classes.flamelinkGalleryInnerContainer}>
                        <Grid item lg={8} md={8} sm={12} xs={12} className={classes.flamelinkGallery}>
                            <div>
                                <RenderGallery key={Math.random()} />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(FlameLinkCollectionGallery);