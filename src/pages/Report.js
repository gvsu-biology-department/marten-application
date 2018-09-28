import React, { Component } from 'react';
import ReportForm from '../components/ReportForm';
import Typography from '@material-ui/core/Typography';

class Report extends Component {
    render() {
        return (
            <Typography variant='display1' align='left' gutterBottom>
            <ReportForm/>
            </Typography>
        );
    }
}

export default Report;
