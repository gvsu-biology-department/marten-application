import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Quiz from 'react-quiz-component';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

// Style for the tabs.
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class QuizGame extends React.Component {

    /**
     * Shuffles a given array.
     * @param {*} array The array passed in.
     */
    shuffleArray = array => {
        let shuffled = array;

        var j, x, i;

        for (i = shuffled.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = x;
        }

        return shuffled;
    }

    reset = () => {
        this.setState({
            difficulty: this.pickDifficulty(this.props.difficulty),
            key: Math.random()
        });
    }

    easy = {
        "quizTitle": "Trail Cam Quiz: Easy",
        "questions": [
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
        ]
    }

    medium = {
        "quizTitle": "Trail Cam Quiz: Medium",
        "questions": [
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
        ]
    }

    hard = {
        "quizTitle": "Trail Cam Quiz: Hard",
        "questions": [
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
        ]
    }

    /**
     * This function returns the
     * quiz data based on the difficulty
     * level passed into it.
     * @param {*} difficulty The difficulty setting passed in.
     */
    pickDifficulty = difficulty => {
        let level

        switch (difficulty) {
            case 'Easy':
                this.easy.questions = this.shuffleArray(this.easy.questions)
                level = this.easy
                break
            case 'Medium':
                this.medium.questions = this.shuffleArray(this.medium.questions)
                level = this.medium
                break
            case 'Hard':
                this.hard.questions = this.shuffleArray(this.hard.questions)
                level = this.hard
                break
            default:
                break
        }

        return level
    }

    // The state of the component.
    state = {
        difficulty: this.pickDifficulty(this.props.difficulty),
        key: Math.random()
    }

    // Renders the quiz component.
    render() {
        const { classes } = this.props;

        return (
            // Tabs
            <div className={classes.root}>
                <Typography variant="headline" align="center">
                    <Grid container justify="center">
                        <Quiz quiz={this.state.difficulty} key={this.state.key} />
                    </Grid>
                </Typography>
                <Typography align="center">
                    <Button variant="contained" color="default" className={classes.button} onClick={this.reset}>
                        Reset
                        <RefreshIcon className={classes.rightIcon} />
                    </Button>
                </Typography>
            </div>
        );
    }
}

QuizGame.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizGame);