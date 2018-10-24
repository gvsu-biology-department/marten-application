import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

function TabContainer(props) {
    return (
        <Typography component="div" variant='headline' align='center' style={{ padding: 8 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

// Style for the tabs.
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop: '64px',
        overflow: 'scroll',
        height: '95%',
    },
});

class QuizGame extends React.Component {
    // The state of the component.
    state = {
        value: 0,
    };

    // Handles tab changes.
    handleChange = (event, value) => {
        this.setState({ value });
    };

    // Object that contains the easy quiz material.
    easyQuiz = {
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
    };

    // Renders the quiz component.
    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            // Tabs
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        centered
                        fullWidth
                        onChange={this.handleChange}
                    >
                        <Tab label="Easy" />
                        <Tab label="Medium" />
                        <Tab label="Hard" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                    <Fragment>
                        <Grid container justify="center">
                            <Quiz quiz={this.easyQuiz} />
                        </Grid>
                    </Fragment>
                </TabContainer>}
                {value === 1 && <TabContainer>Medium Quiz</TabContainer>}
                {value === 2 && <TabContainer>Hard Quiz</TabContainer>}
            </div>
        );
    }
}

QuizGame.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizGame);