import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import Avatar from '@material-ui/core/Avatar';
import JobRouter from "../../assets/img/JobRouter.ico"

const styles = () => ({
    mainJRIcon: {width: "70px !important", height: "70px !important", "border-radius": "0 !important"}
})

function SignUp(props) {
    const { classes } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar src={JobRouter} 
                    className={classes.mainJRIcon}
                    />
                }
                title="Welcome to Job Router"
                subheader="Please sign in"
                titleTypographyProps={{variant:"h3"}}
            />
            <CardContent>
                <Grid container justify="space-evenly">
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth={true}
                    label="Email"
                    placeholder="example@example.com"
                    className={classes.textField}
                    margin="normal"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth={true}
                    label="Password"
                    placeholder="Secret123!@#"
                    className={classes.textField}
                    margin="normal"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                    </Grid>
            </CardContent>
            <CardActions>
                <Grid container direction="row" alignItems="center" justify="space-between">
                    <Grid item >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => props.signin(email, password, props.router.history)}>
                            Sign In!
                </Button>
                    </Grid>
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
        signin(email, password, reroute) {
            axios.post("/v1/auth/signin", { email, password }).then(res => {
                console.log(res.data.postingsApplied)
                dispatch(updateAuth({
                    token: res.data.token,
                    username: res.data.username,
                    userId: res.data.userId,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    userCity: res.data.userCity,
                    userStateCode: res.data.userStateCode,
                    numberSaved: res.data.numberSaved,
                    numberApplied: res.data.numberApplied,
                    savedChartData: res.data.savedChartData,
                    appliedChartData: res.data.appliedChartData,
                    postingsViewed: res.data.postingsViewed,
                    postingsSaved: res.data.postingsSaved,
                    postingsApplied: res.data.postingsApplied,
                    recentSearches: res.data.recentSearches,
                    totalSearches: res.data.totalSearches,
                    siteTag: [],
                    filterTag: [],
                    sortTag: [],
                }));
                reroute.push("/dashboard")
            }).catch(err => {
                console.error(err);
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignUp));
