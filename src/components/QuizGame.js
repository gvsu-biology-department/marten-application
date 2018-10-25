import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Quiz from 'react-quiz-component';

/**
 * Shuffles a given array.
 * @param {*} array The array passed in.
 */
function shuffleArray(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

// Style for the tabs.
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class QuizGame extends React.Component {

    easy = {
        "quizTitle": "Trail Cam Quiz: Easy",
        "questions": shuffleArray([
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question1.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "Black bear",
                    "Common wombat",
                    "Raccoon",
                    "White-tailed deer"
                ],
                "correctAnswer": "1"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question2.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American beaver",
                    "Muskrat",
                    "Porcupine",
                    "Woodchuck"
                ],
                "correctAnswer": "3"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question3.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American badger",
                    "Raccoon",
                    "Striped skunk",
                    "Virginia opossum"
                ],
                "correctAnswer": "2"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question4.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "Eastern fox squirrel",
                    "Eastern gray squirrel",
                    "Red squirrel",
                    "Southern flying squirrel"
                ],
                "correctAnswer": "3"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question5.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American Crow",
                    "Black Vulture",
                    "Turkey Vulture",
                    "Northern Raven"
                ],
                "correctAnswer": "3"
            },
        ])
    }

    medium = {
        "quizTitle": "Trail Cam Quiz: Medium",
        "questions": shuffleArray([
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question1.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "Black bear",
                    "Common wombat",
                    "Raccoon",
                    "White-tailed deer"
                ],
                "correctAnswer": "1"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question2.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American beaver",
                    "Muskrat",
                    "Porcupine",
                    "Woodchuck"
                ],
                "correctAnswer": "3"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question3.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American badger",
                    "Raccoon",
                    "Striped skunk",
                    "Virginia opossum"
                ],
                "correctAnswer": "2"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question4.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "Eastern fox squirrel",
                    "Eastern gray squirrel",
                    "Red squirrel",
                    "Southern flying squirrel"
                ],
                "correctAnswer": "3"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question5.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American Crow",
                    "Black Vulture",
                    "Turkey Vulture",
                    "Northern Raven"
                ],
                "correctAnswer": "3"
            },
        ])
    }

    hard = {
        "quizTitle": "Trail Cam Quiz: Hard",
        "questions": shuffleArray([
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question1.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "Black bear",
                    "Common wombat",
                    "Raccoon",
                    "White-tailed deer"
                ],
                "correctAnswer": "1"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question2.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American beaver",
                    "Muskrat",
                    "Porcupine",
                    "Woodchuck"
                ],
                "correctAnswer": "3"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question3.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American badger",
                    "Raccoon",
                    "Striped skunk",
                    "Virginia opossum"
                ],
                "correctAnswer": "2"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question4.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "Eastern fox squirrel",
                    "Eastern gray squirrel",
                    "Red squirrel",
                    "Southern flying squirrel"
                ],
                "correctAnswer": "3"
            },
            {
                "question": <Fragment>What animal is this?<br /><br /><img src="/quizimages/question5.jpg" alt=""></img></Fragment>,
                "questionType": "text",
                "answers": [
                    "American Crow",
                    "Black Vulture",
                    "Turkey Vulture",
                    "Northern Raven"
                ],
                "correctAnswer": "3"
            },
        ])
    }

    pickDifficulty = difficulty => {
        let level

        switch (difficulty) {
            case 'Easy':
                level = this.easy
                break
            case 'Medium':
                level = this.medium
                break
            case 'Hard':
                level = this.hard
                break
            default:
                break
        }

        return level
    }

    // The state of the component.
    state = {
        //difficulty: pickDifficulty(this.props.difficulty)
        difficulty: this.pickDifficulty(this.props.difficulty)
    }

    // Renders the quiz component.
    render() {
        const { classes } = this.props;

        return (
            // Tabs
            <div className={classes.root}>
                <Grid container justify="center">
                    <Quiz quiz={this.state.difficulty} />
                </Grid>
            </div>
        );
    }
}

QuizGame.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizGame);