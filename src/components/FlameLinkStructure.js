import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import flamelinkApp from '../flamelink.js';
import FlameLinkImage from './FlameLinkImage';


class FlameLinkStructure extends Component {
    constructor() {
        super();

        this.state = {
          schemaContent: '',
        }

        flamelinkApp.content.get('martenSchemaDemo')
        .then(result => this.setState({
          schemaContent: result
        }))
 
      }

    getContent(key, type, description){
        if (type === 'text'){
            if(description === 'h1'){
                return  (
                        <Typography variant="display2" id={this.props.field.key}>
                        {this.state.schemaContent[key]}
                        </Typography>
                        )                
            }
            if(description === 'h2'){
                return  (
                        <Typography variant="display3" id={this.props.field.key}>
                        {this.state.schemaContent[key]}
                        </Typography>
                        )                
            }
            else{
                return  (
                        <Typography component="p" id={this.props.field.key}>
                        {this.state.schemaContent[key]}
                        </Typography>
                        )
            }
        }
        if (type === 'media'){
            for (var val in this.state.schemaContent[key]){
                return <FlameLinkImage content={this.state.schemaContent[key][val]}/>
            } 
        }
    }

    render() {
        const lg = this.props.field.gridColumns.lg;
        const md = this.props.field.gridColumns.md;
        const sm = this.props.field.gridColumns.sm;
        const xs = this.props.field.gridColumns.xs;
        return(
            <Grid item lg={lg} md={md} sm={sm} xs={xs}>
                      {this.getContent(this.props.field.key, this.props.type, this.props.field.description)}
            </Grid>
        );
    }
}

export default FlameLinkStructure;