import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Sidebar from "../../components/Sidebar/Sidebar"
import Main from "../../components/Main/Main"
import Search from "../../components/Search/Search"
import Saved from "../../components/Saved/Saved"
import Account from "../../components/Account/Account"
import "./style.css"

const styles = () => ({
    root: {
        flexGrow: 1,
        height: "100vh",
        width: "auto",
        "padding-top": "1rem"
    },
})

function Dashboard(props) {
    const { classes } = props;
    function miniRoutes() {
        switch (props.location.pathname) {
            case ("/dashboard/home"):
                return (<Main routeProps={props} />)
            case ("/dashboard/search"):
                return (<Search routeProps={props} />)
            case ("/dashboard/saved"):
                return (<Saved routeProps={props} />)
            case ("/dashboard/account"):
                return (<Account routeProps={props} />)
            default:
                props.history.push("/dashboard/home")
                return
        }
    }
    //IMPORTANT DONT DELETE, JUST TIRED OF LOGGING
    if (props.user.authenticated && props.user.token !== "") {
    return (
        <div>
            <Sidebar locationProps={props}/>
            <Grid container className={classes.root}
                id="immaSpecialGrid"
            >
                <Grid item xs={12}>
                    <Grid container justify="center" alignItems="center" id="immaSpecialGridToo">
                        <Grid item xs={10}>
                            {miniRoutes()}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
    } else {
        return (<Redirect to="/" />)
    }
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {

    }
}

function mapStateToProps(state) {
    return { user: state.auth}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));