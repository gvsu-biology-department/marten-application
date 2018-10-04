import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Home from '../pages/Home';
import ViewMap from '../pages/ViewMap';
import Quiz from '../pages/Quiz';
import SightingList from '../pages/SightingList';
import Report from '../pages/Report';
import Info from '../pages/Info';
import flamelink from 'flamelink';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

const flamelinkApp = flamelink({
          apiKey: "AIzaSyAYf9AbeYwLY892NRiQfn0AMtG9xIFAJbo",
          authDomain: "marten-application.firebaseapp.com",
          databaseURL: "https://marten-application.firebaseio.com",
          projectId: "marten-application",
          storageBucket: "marten-application.appspot.com",
          messagingSenderId: "659856510832"
});

class SimpleTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} centered>
                <Tab label="Home" />
                <Tab label="Report a Sighting"/>
                <Tab label="Sightings" />
                <Tab label="Trail-Cam Quiz" />
                <Tab label="View Map" />
                <Tab label="Marten Info" />
            </Tabs>
        </AppBar>
        {value === 0 && <Home/>}
        {value === 1 && <Report/>}
        {value === 2 && <SightingList/>}
        {value === 3 && <Quiz/>}
        {value === 4 && <ViewMap/>}
        {value === 5 && <Info flamelinkApp={flamelinkApp}/>}
    </div>
    );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);

