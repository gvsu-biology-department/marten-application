import React, { Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import flamelinkApp from '../flamelink.js';

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

    getContent(key, type){
        if (type == 'text'){
            return this.state.schemaContent[key]
        }
        if (type == 'media'){
            for (var val in this.state.schemaContent[key]){
                console.log(this.state.schemaContent[key][val]);
                flamelinkApp.storage.getURL(this.state.schemaContent[key][val])
                    .then(url => console.log('File URL:', url))
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
                <Paper>
                    <Typography variant="h5" component="h3">
                      HEADER
                    </Typography>
                    <Typography component="p">
                      {this.getContent(this.props.field.key, this.props.type)}
                    </Typography>
                </Paper>
            </Grid>
        );
    }
}

export default FlameLinkStructure;