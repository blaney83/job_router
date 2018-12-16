import React, { useState } from "react";
import { connect, getState } from "react-redux";
import store from "../../state";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { updateAuth } from "../../state/auth/actions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = () => ({

})

function Main(props) {
    let state = store.getState()
    console.log(state)
    const { classes } = props;
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    return (
        <div>
            <Grid container>
                <Grid item xsm={12} md={4}>
                    <Card className={classes.card} color="success">
                        <CardContent>
                            <Typography variant="h4" >Number of Searches</Typography>
                            <Typography variant="h3" >0</Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Grid container direction="row" alignItems="center" justify="space-between">
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        // onClick={() => props.signin(email, password, props.router.history)}
                                        >
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
                        </CardActions> */}
                    </Card>
                </Grid>
                <Grid item xsm={12} md={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h4" >Number of Saved Jobs</Typography>
                            <Typography variant="h3" >{state.auth.user.numberSaved}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xsm={12} md={4}>
                    <Card className={classes.card}>
                        <CardContent>
                        <Typography variant="h4" >Number of Applied Jobs</Typography>
                            <Typography variant="h3" >{state.auth.user.numberApplied}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xsm={12} md={6}>
                    <Card className={classes.card}>
                        <CardContent>
                        </CardContent>
                        <CardActions>
                            <Grid container direction="row" alignItems="center" justify="space-between">
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    // onClick={() => props.signin(email, password, props.router.history)}
                                    >
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
                </Grid>
                <Grid item xsm={12} md={6}>
                    <Card className={classes.card}>
                        <CardContent>
                        </CardContent>
                        <CardActions>
                            <Grid container direction="row" alignItems="center" justify="space-between">
                                <Grid item >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    // onClick={() => props.signin(email, password, props.router.history)}
                                    >
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
                </Grid>
            </Grid>
        </div>
    )
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

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
                    recentSearches: []
                }));
                reroute.push("/dashboard")
            }).catch(err => {
                console.error(err);
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Main));
