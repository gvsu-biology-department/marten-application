import React, { Component } from 'react';
import QuizGame from '../components/QuizGame';


class QuizPage extends Component {
    render() {
        return (
            <QuizGame difficulty={this.props.difficulty}/>
        );
    }
}

export default QuizPage;
