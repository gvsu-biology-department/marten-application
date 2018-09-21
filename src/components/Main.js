import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Home from '../pages/Home';
import Map from '../pages/Map';
import Quiz from '../pages/Quiz';
import Sighting from '../pages/Sighting';
import Report from '../pages/Report';
import Info from '../pages/Info';

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
        {value === 2 && <Sighting/>}
        {value === 3 && <Quiz/>}
        {value === 4 && <Map/>}
        {value === 5 && <Info/>}
    </div>
    );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);

