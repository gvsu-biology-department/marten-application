import React, { Component } from 'react';
import ReportForm from '../components/forms/ReportForm';

class Report extends Component {
    componentDidMount() {
        document.title = 'Marten Tracker | Report';
    }

    render() {
        return (
            <ReportForm/>
        );
    }
}

export default Report;
