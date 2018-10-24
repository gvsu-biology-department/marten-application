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
import ListIcon from '@material-ui/icons/List';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import Home from '../pages/Home';
import ViewMap from '../pages/ViewMap';
import Quiz from '../pages/Quiz';
import SightingList from '../pages/SightingList';
import Report from '../pages/Report';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
        key: ''
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }

    nav = (text) => {
        this.setState({
            key: text
        })
    }

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button key='Home' onClick={() => this.nav('Home')}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                    <ListItem button key='Report' onClick={() => this.nav('Report')}>
                        <ListItemIcon><AssignmentIcon/></ListItemIcon>
                        <ListItemText primary='Report' />
                    </ListItem>
                    <ListItem button key='Map' onClick={() => this.nav('Map')}>
                        <ListItemIcon><MapIcon/></ListItemIcon>
                        <ListItemText primary='Map' />
                    </ListItem>
                    <ListItem button key='List' onClick={() => this.nav('List')}>
                        <ListItemIcon><ListIcon/></ListItemIcon>
                        <ListItemText primary='List' />
                    </ListItem>
                    <ListItem button key='Quiz' onClick={() => this.nav('Quiz')}>
                        <ListItemIcon><SlideshowIcon/></ListItemIcon>
                        <ListItemText primary='Quiz' />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='title' color="inherit" noWrap>
                            The American Marten
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
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
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                    <div className={classes.toolbar} />
                    {this.state.key === 'Home' && <Home />}
                    {this.state.key === 'Report' && <Report />}
                    {this.state.key === 'Map' && <ViewMap />}
                    {this.state.key === 'List' && <SightingList />}
                    {this.state.key === 'Quiz' && <Quiz />}
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);