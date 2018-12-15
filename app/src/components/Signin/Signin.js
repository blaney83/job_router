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

function SignUp(props) {
    console.log(props)
    const { classes } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Card className={classes.card}>
            <CardHeader
                title="Welcome to Job Router"
                subheader="Please sign in"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </CardContent>
            <CardActions>
                <Grid container direction="row" alignItems="center" justify="space-between">
                    <Grid item >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => props.signin(email, password)}>
                            Sign In!
                </Button>
                    </Grid>
                    <Grid item >or</Grid>
                    <Grid item >
                        <Link to="/signup">
                            <Button
                                variant="contained"
                            >
                                Create an Account
                        </Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        signin(email, password) {
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
                    recentSearches: []
                }));
            }).catch(err => {
                console.error(err);
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignUp));
