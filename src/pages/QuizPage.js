import React, { Component } from 'react';
import QuizGame from '../components/QuizGame';


class QuizPage extends Component {
    componentWillMount() {
        document.title = 'Marten Tracker | Quiz';
        this.setState({difficulty: this.props.location.state.difficulty});
    }

    render() {
        return (
            <QuizGame difficulty={this.state.difficulty}/>
        );
    }
}

export default QuizPage;
