import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { updateAuth } from "../../state/auth/actions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = () => ({

})

function Account(props) {
    console.log(props)
    const { classes } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userStateCode, setUserStateCode] = useState("");

    return (
        <Card className={classes.card}>
            <CardHeader
                title="Update Your Account"
            // subheader="If you already have an account, choose the sign in option below"
            />
            <CardContent>
                <TextField
                    // id="standard-with-placeholder"
                    label="Email"
                    placeholder="example@example.com"
                    className={classes.textField}
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    // id="standard-with-placeholder"
                    label="Password"
                    placeholder="Secret123!@#"
                    className={classes.textField}
                    margin="normal"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    // id="standard-with-placeholder"
                    label="Username"
                    placeholder="JohnDoe123"
                    className={classes.textField}
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    // id="standard-with-placeholder"
                    label="First Name"
                    placeholder="John"
                    className={classes.textField}
                    margin="normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    // id="standard-with-placeholder"
                    label="Last Name"
                    placeholder="Doe"
                    className={classes.textField}
                    margin="normal"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    // id="standard-with-placeholder"
                    label="City"
                    placeholder="Phoenix"
                    className={classes.textField}
                    margin="normal"
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                />
                <TextField
                    // id="standard-with-placeholder"
                    label="State"
                    placeholder="AZ (two letters)"
                    className={classes.textField}
                    margin="normal"
                    value={userStateCode}
                    onChange={(e) => setUserStateCode(e.target.value)}
                />
            </CardContent>
            <CardActions>
                <Grid container direction="row" alignItems="center" justify="space-between">
                    <Grid item >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => props.signup(email, password, username, firstName, lastName, userCity, userStateCode, props.router.history)}>
                            Update Account
                        </Button>
                    </Grid>
                    <Grid item >or</Grid>
                    <Grid item >
                        <Link to="/">
                            <Button variant="contained">Sign In</Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        signin(email, password, reroute) {
            axios.post("/v1/auth/signin", { email, password }).then(res => {
                console.log(res.data)
                dispatch(updateAuth({
                    token: res.data.token,
                    username: res.data.username,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    userCity: res.data.userCity,
                    userStateCode: res.data.userStateCode,
                    numberSaved: res.data.numberSaved,
                    numberApplied: res.data.numberSaved,
                    userId: res.data._id,
                    recentSearches: []
                }));
                reroute.push("/dashboard")
            }).catch(err => {
                console.error(err);
            })
        }
    }
}

function mapStateToProps(state) {
    return { user: state.auth.user, email: state.auth.email }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));