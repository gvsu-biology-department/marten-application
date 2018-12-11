import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
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
import EmailIcon from '@material-ui/icons/Email';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MapIcon from '@material-ui/icons/Map';
import InfoIcon from '@material-ui/icons/Info';
import ListIcon from '@material-ui/icons/List';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import Home from '../pages/Home';
import ViewMap from '../pages/ViewMap';
import About from '../pages/About';
import Quiz from '../pages/QuizPage';
import Contact from '../pages/Contact';
import SightingList from '../pages/SightingList';
import Report from '../pages/Report';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import FlameLinkCollectionGallery from '../components/flamelink/FlameLinkCollectionGallery';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ThemeSwitch from '@material-ui/core/Switch';
import { withCookies, Cookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

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
    componentWillMount() {
        const { cookies } = this.props;

        var newName, newTheme, newChecked;

        if (cookies.get('themeName') === undefined) {
            newName = 'light'
            newTheme = createMuiTheme({
                typography: {
                    useNextVariants: true,
                },
                palette: {
                    type: 'light'
                }
            });
            newChecked = true;

            cookies.set('themeName', newName, { path: '/' });
        } else {
            if (cookies.get('themeName') === 'light') {
                newName = 'light'
                newTheme = createMuiTheme({
                    typography: {
                        useNextVariants: true,
                    },
                    palette: {
                        type: 'light'
                    }
                });
                newChecked = true;
            } else {
                newName = 'dark'
                newTheme = createMuiTheme({
                    typography: {
                        useNextVariants: true,
                    },
                    palette: {
                        type: 'dark'
                    }
                });
                newChecked = false;
            }
        }

        this.setState({
            mobileOpen: false,
            open: false,
            open2: false,
            theme: newTheme,
            themeName: newName,
            themeChecked: newChecked
        });
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open, open2: false }));
    }

    handleClick2 = () => {
        this.setState(state => ({ open2: !state.open2, open: false }));
    }

    handleChange = name => event => {
        const { cookies } = this.props;

        var newTheme, newName;

        if (this.state.themeName === 'light') {
            newTheme = createMuiTheme({
                typography: {
                    useNextVariants: true,
                },
                palette: {
                    type: 'dark'
                }
            });

            newName = 'dark';
        } else {
            newTheme = createMuiTheme({
                typography: {
                    useNextVariants: true,
                },
                palette: {
                    type: 'light'
                }
            });

            newName = 'light';
        }

        this.setState({
            themeName: newName,
            theme: newTheme
        })

        cookies.set('themeName', newName, { path: '/' });
    };

    render() {
        const { classes } = this.props;
        const drawer = (
            <Typography component="div">
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <Link to='/'>
                      <ListItem button>
                          <ListItemIcon><HomeIcon /></ListItemIcon>
                          <ListItemText primary='Home' />
                      </ListItem>
                    </Link>
                    <Link to='/report'>
                      <ListItem button>
                          <ListItemIcon><AssignmentIcon /></ListItemIcon>
                          <ListItemText primary='Report' />
                      </ListItem>
                    </Link>
                    <Link to='/view-map'>
                      <ListItem button>
                          <ListItemIcon><MapIcon /></ListItemIcon>
                          <ListItemText primary='Map' />
                      </ListItem>
                    </Link>
                    <Link to='/sighting-list'>
                      <ListItem button>
                          <ListItemIcon><ListIcon /></ListItemIcon>
                          <ListItemText primary='List' />
                      </ListItem>
                    </Link>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <SlideshowIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Quiz" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to='/quiz-easy'>
                              <ListItem button className={classes.nested}>
                                  <ListItemText inset primary="Easy" />
                              </ListItem>
                            </Link>
                            <Link to='/quiz-intermediate'>
                              <ListItem button className={classes.nested}>
                                  <ListItemText inset primary="Intermediate" />
                              </ListItem>
                            </Link>
                            <Link to='/quiz-advanced'>
                              <ListItem button className={classes.nested}>
                                  <ListItemText inset primary="Advanced" />
                              </ListItem>
                            </Link>
                        </List>
                    </Collapse>
                    <Link to='/contact'>
                      <ListItem button>
                          <ListItemIcon><EmailIcon /></ListItemIcon>
                          <ListItemText primary='Contact' />
                      </ListItem>
                    </Link>
                    <Link to='/about'>
                      <ListItem button>
                          <ListItemIcon><InfoIcon /></ListItemIcon>
                          <ListItemText primary='About' />
                      </ListItem>
                    </Link>
                    <ListItem button onClick={this.handleClick2}>
                        <ListItemIcon>
                            <PhotoLibraryIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Galleries" />
                        {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                      <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to='galleries-martens-and-kits'>
                              <ListItem button className={classes.nested}>
                                  <ListItemText inset primary="Martens and Kits" />
                              </ListItem>
                            </Link>
                            <Link to='galleries-martens-at-night'>
                              <ListItem button className={classes.nested}>
                                  <ListItemText inset primary="Martens at Night" />
                              </ListItem>
                            </Link>
                            <Link to='galleries-martens-by-day'>
                              <ListItem button className={classes.nested}>
                                  <ListItemText inset primary="Martens Being Martens" />
                              </ListItem>
                            </Link>
                            <Link to='galleries-species-similar-to-martens'>
                              <ListItem button className={classes.nested}>
                                  <ListItemText inset primary="Species Similar to Martens" />
                              </ListItem>
                            </Link>
                        </List>
                    </Collapse>
                </List>
                <Divider />
            </Typography>
        );

        return (
          <Router>
            <MuiThemeProvider theme={this.state.theme}>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" color="primary" className={classes.appBar}>
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
                            <ThemeSwitch
                                checked={this.state.themeChecked}
                                onChange={this.handleChange('themeChecked')}
                                value="themeChecked"
                                color="default"
                            />
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer}>
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={this.props.container}
                                variant="temporary"
                                anchor={this.state.theme.direction === 'rtl' ? 'right' : 'left'}
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
                        <Switch>
                          <Route path="/" exact={true} component={Home} />
                          <Route path="/report" component={ () => { return <Report/> }} />
                          <Route path="/view-map" component={ () => { return <ViewMap/> }} />
                          <Route path="/sighting-list" component={ () => { return <SightingList themeName={this.state.themeName}/> }} />
                          <Route path="/about" component={ () => { return <About/> }} />
                          <Route path="/contact" component={ () => { return <Contact/> }} />
                          <Route path="/quiz-easy" component={ () => { return <Quiz difficulty='Easy'/> }} />
                          <Route path="/quiz-intermediate" component={ () => { return <Quiz difficulty='Intermediate'/> }} />
                          <Route path="/quiz-advanced" component={ () => { return <Quiz difficulty='Advanced'/> }} />
                          <Route path="/galleries-martens-and-kits" component={ () => { return <FlameLinkCollectionGallery galleryName={'martensAndKits'}/> }} />
                          <Route path="/galleries-martens-at-night" component={ () => { return <FlameLinkCollectionGallery galleryName={'martensAtNight'}/> }} />
                          <Route path="/galleries-martens-by-day" component={ () => { return <FlameLinkCollectionGallery galleryName={'martensBeingMartens'}/> }} />
                          <Route path="/galleries-similar-species" component={ () => { return <FlameLinkCollectionGallery galleryName={'similarSpecies'}/> }} />
                        </Switch>
                    </main>
                </div>
            </MuiThemeProvider>
          </Router>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
};

export default withStyles(styles, { withTheme: true })(withCookies(ResponsiveDrawer));