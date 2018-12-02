import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import emailjs from '../../utilities/emailjs.js'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

/**
 * Styles that the different
 * Material UI components pull
 * in. Mostly used for spacing.
 */
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        flexBasis: 280,
        width: '90%'
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
    icon: {
        fontSize: 20,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    menu: {
        width: 200,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    }
});

/**
 * The form component.
 */
class ContactForm extends React.Component {

    /**
     * State of form components.
     */
    state = {
        name: "",
        email: "",
        comments: "",
        open: false
    };

    /**
     * Handles state change in form
     * components.
     */
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    /**
     * Handles closing the toast.
     */
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    /**
     * Event listener for form.
     * When the form is submitted,
     * this function passes the
     * data along to EmailJS.
     */
    handleSubmit = e => {
        e.preventDefault();

        const templateParams = {
            from_name: this.state.name,
            from_email: this.state.email,
            message_html: this.state.comments
        };

        emailjs.send('default_service', 'template_XaKOJGSf', templateParams);

        this.setState({
            name: "",
            email: "",
            comments: "",
            open: true
        });
    };

    /**
     * The render method for this component.
     */
    render() {
        const { classes } = this.props;

        /**
         * The actual form.
         */
        return (
            <Fragment>
                <Typography variant="headline" align="center">
                {<br/>}
                Send us an email!

                <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container className="contact-form">
                        <Grid item xs={12}>
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        required
                                        label="Name"
                                        name="message-name"
                                        placeholder="John Doe"
                                        value={this.state.name}
                                        className={classes.textField}
                                        onChange={this.handleChange('name')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="email"
                                        required
                                        label="Email"
                                        name="message-email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="example@mail.com"
                                        value={this.state.email}
                                        className={classes.textField}
                                        onChange={this.handleChange('email')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="comments"
                                        required
                                        label="Comments"
                                        name="message-comments"
                                        multiline
                                        rows="5"
                                        placeholder="The message you would like to send us."
                                        value={this.state.comments}
                                        className={classes.textField}
                                        onChange={this.handleChange('comments')}
                                        margin="normal"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" type="submit" color="primary" className={classes.button}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                </Typography>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id" className={classes.message}><CheckCircleIcon className={classes.icon} />Message sent.</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </Fragment>
        );
    }
}

ContactForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactForm);
