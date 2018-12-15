import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../state";
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import "./style.css"

const styles = () => ({
    root: {
        flexGrow: 1,
        height: "100vh",
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

    if (store.getState().auth.authenticated) {
        return (
            <Grid container className={classes.root} alignItems="center">
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Paper>
                                {/* {props.location.pathname === "/signup" ? <Signup router={props}/> :  <Signin router={props}/>} */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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

export default connect(null, mapDispatchToProps)(withStyles(styles)(Dashboard));