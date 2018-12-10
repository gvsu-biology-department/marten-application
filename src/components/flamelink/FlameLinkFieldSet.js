import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';
import FlameLinkFieldSetContent from './FlameLinkFieldSetContent';


class FlameLinkFieldSet extends Component {


    getFieldSetContent(content1, content2){
        var arr = [];
        for (var val in content2){
            arr.push(val);
        }  
        var arrContent = [content1, content2];
        return arr.map(this.createFieldSetComponents, arrContent);
    }

    createFieldSetComponents(num){
        return <FlameLinkFieldSetContent field={this[1][num]} type={this[1][num].type} key={this[1][num].key} fieldKey={this[1][num].key} data={this[0]}/>
    }

    render() {
        return(
            <Grid item xs={12}>
                    {this.getFieldSetContent(this.props.field, this.props.field2)}
            </Grid>
        );
    }
}

export default FlameLinkFieldSet;