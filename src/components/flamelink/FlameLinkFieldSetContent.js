import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FlameLinkImage from './FlameLinkImage';

const styles = theme => ({
        flamelinkFieldSetItem: {
            paddingBottom: 10,
        },
    });

class FlameLinkFieldSetContent extends Component {

    getContent(key, type, description, fieldsetContent){
        if (type === 'text'){
                return  (
                        <Typography variant='body2' component="p" id={this.props.field.key}>
                        {fieldsetContent[key]}
                        </Typography>
                        )
        }
        if(type === 'textarea'){
                return  (
                        <Typography variant='body2' component="p" id={this.props.field.key} gutterBottom>
                        {fieldsetContent[key]}
                        </Typography>
                        ) 
        }
        if (type === 'media'){
            for (var val in fieldsetContent[key]){
                return <FlameLinkImage content={fieldsetContent[key][val]}/>
            } 
        }
    }

    render() {
        const { classes } = this.props;

        const lg = this.props.field.gridColumns.lg;
        const md = this.props.field.gridColumns.md;
        const sm = this.props.field.gridColumns.sm;
        const xs = this.props.field.gridColumns.xs;
        return(
            <Grid item lg={lg} md={md} sm={sm} xs={xs} className={classes.flamelinkFieldSetItem}>
                    {this.getContent(this.props.fieldKey, this.props.type, this.props.field.description, this.props.data)}
            </Grid>
        );
    }
}

export default withStyles(styles)(FlameLinkFieldSetContent);