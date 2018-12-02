import React, { Component } from 'react';
import Main from './components/Main';
import './css/App.css';

class App extends Component {
    componentDidMount() {
        document.title = 'Marten Tracker';
    }

    render() {
        return (
        <div>
            <Main/>
        </div>
        );
    }
}

export default App;