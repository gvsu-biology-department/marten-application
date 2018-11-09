import React, { Component } from 'react';
import QuizGame from '../components/QuizGame';


class QuizPage extends Component {
    componentDidMount() {
        document.title = 'Marten Tracker | Quiz';
    }

    render() {
        return (
            <QuizGame difficulty={this.props.difficulty}/>
        );
    }
}

export default QuizPage;
