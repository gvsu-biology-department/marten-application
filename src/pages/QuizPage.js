import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import QuizGame from '../components/QuizGame';


class QuizPage extends Component {
  render() {
    return (
      <Typography variant='display1' align='center' gutterBottom>
          <QuizGame />
      </Typography>
    );
  }
}

export default QuizPage;
