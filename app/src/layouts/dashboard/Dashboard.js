import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../state";
import Paper from '@material-ui/core/Paper';
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
    console.log("dashboard", props)
    const { classes } = props;
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [username, setUsername] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [userCity, setUserCity] = useState("");
    // const [userStateCode, setUserStateCode] = useState("");
    function miniRoutes() {
        console.log(props.location.pathname)
        switch (props.location.pathname) {
            case ("/dashboard/home"):
                console.log("fired")
                return (<Main routeProps={props} />)
            case ("/dashboard/search"):
                console.log("fired")
                return (<Search routeProps={props} />)
            case ("/dashboard/saved"):
                console.log("fired")
                return (<Saved routeProps={props} />)
            case ("/dashboard/account"):
                console.log("fired")
                return (<Account routeProps={props} />)
            default:
                props.history.push("/dashboard/home")
                return
        }
    }
    //IMPORTANT DONT DELETE, JUST TIRED OF LOGGING
    // if (store.getState().auth.authenticated) {
    return (
        <div>
            <Sidebar />
            <Grid container className={classes.root}
                // alignItems="center"
            >
                <Grid item xs={12}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={10}>
                            {miniRoutes()}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
    // } else {
    //     return (<Redirect to="/" />)
    // }
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Dashboard));