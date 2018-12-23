import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeAccountInfo } from "../../state/auth/actions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import { Typography } from "@material-ui/core";

const styles = () => ({
    header1: {
        backgroundImage: "linear-gradient(to right, #c24a04 , #ffe291); !important",
    },
    generalMessage: {
        color: "black"
    },
    goodMessage: {
        color: "green"
    },
    cautionMessage: {
        color: "#d09c00"
    },
    badMessage: {
        color: "red"
    },
    liveAccountInfo: {
        backgroundImage: "linear-gradient(to right, #c24a04 , #ffe291)",
        color: "black",
        padding: ".5rem",
        borderRadius: "4px",
        marginTop: ".3rem"
    },
    boldSpans: {
        fontWeight: "bold"
    }
})

function Account(props) {
    const { classes } = props;
    const [username, setUsername] = useState(props.user.username);
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [userCity, setUserCity] = useState(props.user.userCity);
    const [userStateCode, setUserStateCode] = useState(props.user.userStateCode);
    const [origUsername, setOrigUsername] = useState(props.user.username);
    const [origFirstName, setOrigFirstName] = useState(props.user.firstName);
    const [origLastName, setOrigLastName] = useState(props.user.lastName);
    const [origUserCity, setOrigUserCity] = useState(props.user.userCity);
    const [origUserStateCode, setOrigUserStateCode] = useState(props.user.userStateCode);
    const [changeMessage, setChangeMessage] = useState("Use the form below to submit any changes you would like to make to your account!");
    const [messageClass, setMessageClass] = useState(classes.generalMessage);

    return (
        <Card className={classes.card}>
            <CardHeader
                title="Update Your Account"
                className={classes.header1}
                titleTypographyProps={{ variant: "h4" }}
            />
            <CardContent>
                <Typography variant="h5" className={messageClass}>{changeMessage}<br /></Typography>
                <Grid container justify="space-between" className={classes.liveAccountInfo}>
                    <Grid item xs={6} >
                        <span className={classes.boldSpans}>Current Username:</span> {origUsername} <br />
                        <span className={classes.boldSpans}>Current First Name:</span> {origFirstName}<br />
                        <span className={classes.boldSpans}>Current Last Name:</span> {origLastName}<br />
                        <span className={classes.boldSpans}>Current City:</span> {origUserCity} <br />
                        <span className={classes.boldSpans}>Current State:</span> {origUserStateCode}
                    </Grid>
                    <Grid item xs={6}>
                        <span className={classes.boldSpans}>New Username:</span> {username} <br />
                        <span className={classes.boldSpans}>New First Name:</span> {firstName}<br />
                        <span className={classes.boldSpans}>New Last Name:</span> {lastName}<br />
                        <span className={classes.boldSpans}>New City:</span> {userCity} <br />
                        <span className={classes.boldSpans}>New State:</span> {userStateCode}
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent>
                <TextField
                    label="Username"
                    placeholder="JohnDoe123"
                    className={classes.textField}
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="First Name"
                    placeholder="John"
                    className={classes.textField}
                    margin="normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    placeholder="Doe"
                    className={classes.textField}
                    margin="normal"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    label="City"
                    placeholder="Phoenix"
                    className={classes.textField}
                    margin="normal"
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                />
                <InputLabel htmlFor="age-simple">State</InputLabel>
                <Select
                    value={userStateCode}
                    onChange={(e) => setUserStateCode(e.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'age-simple',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"AL"}>AL</MenuItem>
                    <MenuItem value={"AK"}>AK</MenuItem>
                    <MenuItem value={"AZ"}>AZ</MenuItem>
                    <MenuItem value={"AR"}>AR</MenuItem>
                    <MenuItem value={"CA"}>CA</MenuItem>
                    <MenuItem value={"CO"}>CO</MenuItem>
                    <MenuItem value={"CT"}>CT</MenuItem>
                    <MenuItem value={"DE"}>DE</MenuItem>
                    <MenuItem value={"FL"}>FL</MenuItem>
                    <MenuItem value={"GA"}>GA</MenuItem>
                    <MenuItem value={"HI"}>HI</MenuItem>
                    <MenuItem value={"ID"}>ID</MenuItem>
                    <MenuItem value={"IL"}>IL</MenuItem>
                    <MenuItem value={"IN"}>IN</MenuItem>
                    <MenuItem value={"IA"}>IA</MenuItem>
                    <MenuItem value={"KS"}>KS</MenuItem>
                    <MenuItem value={"KY"}>KY</MenuItem>
                    <MenuItem value={"LA"}>LA</MenuItem>
                    <MenuItem value={"ME"}>ME</MenuItem>
                    <MenuItem value={"MD"}>MD</MenuItem>
                    <MenuItem value={"MA"}>MA</MenuItem>
                    <MenuItem value={"MI"}>MI</MenuItem>
                    <MenuItem value={"MN"}>MN</MenuItem>
                    <MenuItem value={"MS"}>MS</MenuItem>
                    <MenuItem value={"MO"}>MO</MenuItem>
                    <MenuItem value={"MT"}>MT</MenuItem>
                    <MenuItem value={"NE"}>NE</MenuItem>
                    <MenuItem value={"NV"}>NV</MenuItem>
                    <MenuItem value={"NH"}>NH</MenuItem>
                    <MenuItem value={"NJ"}>NJ</MenuItem>
                    <MenuItem value={"NM"}>NM</MenuItem>
                    <MenuItem value={"NY"}>NY</MenuItem>
                    <MenuItem value={"NC"}>NC</MenuItem>
                    <MenuItem value={"ND"}>ND</MenuItem>
                    <MenuItem value={"OH"}>OH</MenuItem>
                    <MenuItem value={"OK"}>OK</MenuItem>
                    <MenuItem value={"OR"}>OR</MenuItem>
                    <MenuItem value={"PA"}>PA</MenuItem>
                    <MenuItem value={"RI"}>RI</MenuItem>
                    <MenuItem value={"SC"}>SC</MenuItem>
                    <MenuItem value={"SD"}>SD</MenuItem>
                    <MenuItem value={"TN"}>TN</MenuItem>
                    <MenuItem value={"TX"}>TX</MenuItem>
                    <MenuItem value={"UT"}>UT</MenuItem>
                    <MenuItem value={"VT"}>VT</MenuItem>
                    <MenuItem value={"VA"}>VA</MenuItem>
                    <MenuItem value={"WA"}>WA</MenuItem>
                    <MenuItem value={"WV"}>WV</MenuItem>
                    <MenuItem value={"WI"}>WI</MenuItem>
                    <MenuItem value={"WY"}>WY</MenuItem>
                </Select>
            </CardContent>
            <CardActions>
                <Grid container direction="row" alignItems="center" justify="space-between">
                    {/* <Grid item > */}
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth={true}
                        onClick={() => props.updateAccount(props.user.userId, props.auth.token, props.auth.authenticated, username, firstName, lastName, userCity, userStateCode, setChangeMessage, setOrigUsername, setOrigFirstName, setOrigLastName, setOrigUserCity, setOrigUserStateCode, changeAccountInfo, setMessageClass, classes)}
                    >
                        Update Account
                        </Button>
                    {/* </Grid> */}
                    {/* <Grid item >or</Grid>
                    <Grid item >
                        <Link to="/">
                            <Button variant="contained">Sign In</Button>
                        </Link>
                    </Grid> */}
                </Grid>
            </CardActions>
        </Card>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        updateAccount(userId, authToken, authenticated, requestedUserName, firstName, lastName, userCity, userStateCode, setChangeMessage, setOrigUsername, setOrigFirstName, setOrigLastName, setOrigUserCity, setOrigUserStateCode, changeAccountInfo, setMessageClass, classes) {
            if (userId && authToken && authenticated && requestedUserName && firstName && lastName && userCity && userStateCode) {
                if (authenticated && authToken !== undefined && authToken !== "" && authToken !== null) {
                    let data = {
                        userId: userId,
                        authToken: authToken,
                        authenticated: authenticated,
                        username: requestedUserName,
                        firstName: firstName,
                        lastName: lastName,
                        userCity: userCity,
                        userStateCode: userStateCode
                    }
                    axios.patch("/v1/auth/update", data)
                        .then(resp => {
                            switch (resp.status) {
                                case (200):
                                    setChangeMessage("You account was successfully updated!")
                                    setMessageClass(classes.goodMessage)
                                    setOrigUsername(requestedUserName)
                                    setOrigFirstName(firstName)
                                    setOrigLastName(lastName)
                                    setOrigUserCity(userCity)
                                    setOrigUserStateCode(userStateCode)
                                    dispatch(changeAccountInfo({
                                        username: requestedUserName,
                                        firstName: firstName,
                                        lastName: lastName,
                                        userCity: userCity,
                                        userStateCode: userStateCode,
                                    }))
                                    return
                                case (202):
                                    setMessageClass(classes.badMessage)
                                    setChangeMessage("Oops! We couldn't find your account... Contact support for more help.")
                                    return
                                case (204):
                                    setMessageClass(classes.cautionMessage)
                                    setChangeMessage("That username is already in use, please try again!")
                                    return
                                case (401):
                                    setMessageClass(classes.badMessage)
                                    setChangeMessage("You are not authorized to make changes to this account. If you believe this is an error, please contact support.")
                                    return
                                default:
                                    setMessageClass(classes.badMessage)
                                    setChangeMessage("Try again!")
                                    return
                            }
                        })
                        .catch(err => console.log(err))
                }
            } else {
                //please fill out all fields
                setMessageClass(classes.cautionMessage)
                setChangeMessage("Please finish filling out the form before hitting submit.")
            }
        }
    }
}

function mapStateToProps(state) {
    return { user: state.auth.user, auth: { authenticated: state.auth.authenticated, token: state.auth.token } }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));