import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Quiz from 'react-quiz-component';

class QuizGame extends React.Component {
    quiz = {
        "quizTitle": "Trail Cam Quiz",
        "questions": [
            {
                "question": <Fragment>What animal is this?<br /><img src="/quizimages/question1.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American marten",
                    "American mink",
                    "Black-footed ferret"
                ],
                "correctAnswer": "1"
            },
            {
                "question": <Fragment>What animal do these tracks belong to?<br /><img src="/quizimages/question2.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American mink",
                    "North American raccoon",
                    "American marten"
                ],
                "correctAnswer": "3"
            },
            {
                "question": <Fragment>What animal is this?<br /><img src="/quizimages/question3.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American marten",
                    "American mink",
                    "Black-footed ferret"
                ],
                "correctAnswer": "2"
            },
            {
                "question": <Fragment>What animal is this?<br /><img src="/quizimages/question4.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American marten",
                    "American mink",
                    "Black-footed ferret"
                ],
                "correctAnswer": "2"
            },
            {
                "question": <Fragment>What animal do these tracks belong to?<br /><img src="/quizimages/question5.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American marten",
                    "American mink",
                    "Black-footed ferret"
                ],
                "correctAnswer": "2"
            },
        ]
    };

    render() {
        return (
            <Fragment>
                <Grid container justify="center">
                    <Quiz quiz={this.quiz} />
                </Grid>
            </Fragment>
        )
    }
}

export default QuizGame;