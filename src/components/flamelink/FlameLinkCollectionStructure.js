import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import flamelinkApp from '../../flamelink.js';
import FlameLinkImage from './FlameLinkImage';
import FlameLinkFieldSet from './FlameLinkFieldSet';

const styles = theme => ({
        flamelinkItem: {
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: 20,
        },
    });

class FlameLinkCollectionStructure extends Component {
    constructor() {
        super();
        
        global.mediaID = '';

        this.state = {
          schemaContent: '',
        }

        flamelinkApp.content.get(global.schemaName)
        .then(result => this.setState({
          schemaContent: result
        }))
      }

    getContent(content, field, key, type, description){
        if (type === 'text'){
                if(description === 'h1'){
                    return  (
                            <Typography variant='display4' id={key}>
                                {content[key]}
                            </Typography>
                            )                
                }
                if(description === 'h2'){
                    return  (
                            <Typography variant='display3' id={key}>
                                {content[key]}
                            </Typography>
                            )                
                }
                if(description === 'h3'){
                    return  (
                            <Typography variant='display2' id={key}>
                                {content[key]}
                            </Typography>
                            )                
                }
                if(description === 'h4'){
                    return  (
                            <Typography variant='display1' id={key}>
                                {content[key]}
                            </Typography>
                            )                
                }
                if(description === 'h5'){
                    return  (
                            <Typography variant='headline' id={key}>
                                {content[key]}
                            </Typography>
                            )                
                }
                if(description === 'h6'){
                    return  (
                            <Typography variant='title' id={key}>
                                {content[key]}
                            </Typography>
                            )                
                }
                else{
                    return  (
                            <Typography variant='body2' component="p" id={key}>
                                {content[key]}
                            </Typography>
                            )
                }
            }
            if(type === 'textarea'){
                return  (
                        <Typography variant='body2' component="p" id={key}>
                            {content[key]}
                        </Typography>
                        )               
            }
            if (type === 'media'){
                for (var val in content[key]){
                    global.mediaID = content[key][val];
                    return <FlameLinkImage/>
                } 
            }
            if (type === 'fieldset'){
                if(content === ''){
                    return
                }
                else{
                    return <FlameLinkFieldSet field={content[key]} field2={field.options}/>
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
            <Grid item lg={lg} md={md} sm={sm} xs={xs} className={classes.flamelinkItem}>
                    {this.getContent(this.props.schemaContent, this.props.field, this.props.field.key, this.props.type, this.props.field.description)}
            </Grid>
        );
    }
}

export default withStyles(styles)(FlameLinkCollectionStructure);