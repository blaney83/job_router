import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { updateAuth } from "../../state/auth/actions";
import { persistor } from "../../state"
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/Search';
import SavedIcon from '@material-ui/icons/Save';
import AccountIcon from '@material-ui/icons/PersonPin';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExitIcon from '@material-ui/icons/FirstPage';
import Avatar from '@material-ui/core/Avatar';
import JobRouter from "../../assets/img/JobRouterWhite.png"
import { searchJobs, updateNumberResults } from "../../state/search/actions";
import { getSaved } from "../../state/saved/actions"
import "./style.css"

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: "10px",
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            position: 'fixed',
            right: "1rem",
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    sideIcons: {
        color: "white !important"
    },
    sideIconLabels: {
        color: "white !important"
    },
    mainIconJR: {
        "border-radius": "0 !important"
    },
    signOutStayDown: {
        position: "absolute",
        bottom: "0px"
    }
});

class Sidebar extends React.Component {
    state = {
        open: false,
        mediaQ: true,
        path: this.props
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
        this.setState({ mediaQ: false });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
        this.setState({ mediaQ: true });
    };

    render() {
        const { classes, theme } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Avatar className={classes.mainIconJR} img={{ color: "transparent" }} src={JobRouter} />
                        <Typography align="center" className={classes.title} variant="h6" color="inherit" noWrap>
                            Job Router
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <Hidden xsDown={this.state.mediaQ} implementation="css">
                    <Drawer
                        variant="permanent"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        })}
                        classes={{
                            paper: classNames("sidebarClass", {
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open,
                            }),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <Link to="/dashboard/home">
                                <ListItem button="true" selected={this.props.locationProps.location.pathname === "/dashboard/home" ? "true" : ""} key={"Home"}>
                                    <ListItemIcon>
                                        <HomeIcon className={classes.sideIcons} />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" primaryTypographyProps={{ className: classes.sideIconLabels }} />
                                </ListItem>
                            </Link>
                            <Link to="/dashboard/search">
                                <ListItem button key={"Search Jobs"} selected={this.props.locationProps.location.pathname === "/dashboard/search" ? "true" : ""}>
                                    <ListItemIcon>
                                        <SearchIcon className={classes.sideIcons} />
                                    </ListItemIcon>
                                    <ListItemText primary="Search Jobs" primaryTypographyProps={{ className: classes.sideIconLabels }} />
                                </ListItem>
                            </Link>
                            <Link to="/dashboard/saved">
                                <ListItem button key={"Saved Jobs"} selected={this.props.locationProps.location.pathname === "/dashboard/saved" ? "true" : ""}>
                                    <ListItemIcon>
                                        <SavedIcon className={classes.sideIcons} />
                                    </ListItemIcon>
                                    <ListItemText primary="Saved Jobs" primaryTypographyProps={{ className: classes.sideIconLabels }} />
                                </ListItem>
                            </Link>
                            <Link to="/dashboard/account">
                                <ListItem button key={"Account"} selected={this.props.locationProps.location.pathname === "/dashboard/account" ? "true" : ""}>
                                    <ListItemIcon>
                                        <AccountIcon className={classes.sideIcons} />
                                    </ListItemIcon>
                                    <ListItemText primary="Account" primaryTypographyProps={{ className: classes.sideIconLabels }} />
                                </ListItem>
                            </Link>
                        </List>
                        <List className={classes.signOutStayDown}>
                            <ListItem button="true" selected={this.props.locationProps.location.pathname === "/" ? "true" : ""} key={"Home"}>
                                <ListItemIcon onClick={() => this.props.signout(persistor)}><Link to="/"><ExitIcon className={classes.sideIcons} /></Link></ListItemIcon>
                                <ListItemText primary="Sign Out" primaryTypographyProps={{ className: classes.sideIconLabels }} />
                            </ListItem>
                        </List>
                    </Drawer>
                </Hidden>
                {/* rest of code */}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signout(persistor) {
            persistor.purge()
            dispatch(updateAuth({
                authenticated: false,
                token: "",
                error: "",
                user: {
                    username: "",
                    firstName: "",
                    lastName: "",
                    userCity: "",
                    userStateCode: "",
                    numberSaved: 0,
                    numberApplied: 0,
                    userId: "",
                    recentSearches: [],
                    savedChartData: [0, 0, 0, 0, 0, 0, 0],
                    appliedChartData: [0, 0, 0, 0, 0, 0, 0],
                    postingsViewed: [],
                    postingsSaved: [],
                    postingsApplied: [],
                    totalSearches: 0,
                    siteTag: 0,
                    filterTag: 0,
                    sortTag: 0,
                }
            }));
            dispatch(searchJobs({
                searchCity: "",
                searchState: "",
                searchJob: "",
                searchResults: [],
            }));
            dispatch(updateNumberResults({
                numberResults: 15
            }));
            dispatch(getSaved({
                savedResults: [],
                savedLoaded: false,
            }));
        }
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Sidebar));