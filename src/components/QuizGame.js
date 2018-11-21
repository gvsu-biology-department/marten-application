import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Quiz from 'react-quiz-component';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import advancedQuiz from '../quiz/advancedQuiz.js'
import easyQuiz from '../quiz/easyQuiz.js'
import intermediateQuiz from '../quiz/intermediateQuiz.js'

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
    }
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

    /**
     * This function returns the
     * quiz data based on the difficulty
     * level passed into it.
     * @param {*} difficulty The difficulty setting passed in.
     */
    pickDifficulty = difficulty => {
        let level;

        switch (difficulty) {
            case 'Easy':
                easyQuiz.questions = this.shuffleArray(easyQuiz.questions);
                level = easyQuiz;
                break;
            case 'Intermediate':
                intermediateQuiz.questions = this.shuffleArray(intermediateQuiz.questions);
                level = intermediateQuiz;
                break;
            case 'Advanced':
                advancedQuiz.questions = this.shuffleArray(advancedQuiz.questions);
                level = advancedQuiz;
                break;
            default:
                break;
        }

        return level;
    }

    // The state of the component.
    state = {
        difficulty: this.pickDifficulty(this.props.difficulty),
        key: Math.random()
    };

    // Renders the quiz component.
    render() {
        const { classes } = this.props;

        return (
            // Tabs
            <div className={classes.root}>
                <Typography variant="title" align="center">
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