import React, { Component } from 'react';
import ReportForm from '../components/ReportForm';

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
