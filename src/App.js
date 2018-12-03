import React, { Component } from 'react';
import Main from './components/Main';
import './App.css';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
    componentDidMount() {
        document.title = 'Marten Tracker';
    }

    render() {
        return (
            <CookiesProvider>
                <div>
                    <Main />
                </div>
            </CookiesProvider>
        );
    }
}

export default App;
