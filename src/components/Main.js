import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MapIcon from '@material-ui/icons/Map';
import InfoIcon from '@material-ui/icons/Info';
import ListIcon from '@material-ui/icons/List';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import Home from '../pages/Home';
import ViewMap from '../pages/ViewMap';
import Info from '../pages/Info';
import Quiz from '../pages/QuizPage';
import SightingList from '../pages/SightingList';
import Report from '../pages/Report';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        width: '60%'
    },
});

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
        key: 'Home',
        open: false
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    }

    nav = (text) => {
        this.setState({
            key: text
        });
    }

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button key='Home' onClick={() => this.nav('Home')}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                    <ListItem button key='Report' onClick={() => this.nav('Report')}>
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary='Report' />
                    </ListItem>
                    <ListItem button key='Map' onClick={() => this.nav('Map')}>
                        <ListItemIcon><MapIcon /></ListItemIcon>
                        <ListItemText primary='Map' />
                    </ListItem>
                    <ListItem button key='List' onClick={() => this.nav('List')}>
                        <ListItemIcon><ListIcon /></ListItemIcon>
                        <ListItemText primary='List' />
                    </ListItem>
                    <ListItem button key='About' onClick={() => this.nav('About')}>
                        <ListItemIcon><InfoIcon /></ListItemIcon>
                        <ListItemText primary='About' />
                    </ListItem>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <SlideshowIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Quiz" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={() => this.nav('Easy-Quiz')}>
                                <ListItemText inset primary="Easy" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => this.nav('Medium-Quiz')}>
                                <ListItemText inset primary="Medium" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => this.nav('Hard-Quiz')}>
                                <ListItemText inset primary="Hard" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                <Divider />
            </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            Marten Tracker
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.key === 'Home' && <Home />}
                    {this.state.key === 'Report' && <Report />}
                    {this.state.key === 'Map' && <ViewMap />}
                    {this.state.key === 'List' && <SightingList />}
                    {this.state.key === 'About' && <Info />}
                    {this.state.key === 'Easy-Quiz' && <Quiz difficulty='Easy'/>}
                    {this.state.key === 'Medium-Quiz' && <Quiz difficulty='Medium'/>}
                    {this.state.key === 'Hard-Quiz' && <Quiz difficulty='Hard'/>}
                </main>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);