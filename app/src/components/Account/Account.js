import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

const styles = () => ({

})

function Account(props) {
    const { classes } = props;
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [username, setUsername] = useState(props.user.username);
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [userCity, setUserCity] = useState(props.user.userCity);
    const [userStateCode, setUserStateCode] = useState(props.user.userStateCode);

    return (
        <Card className={classes.card}>
            <CardHeader
                title="Update Your Account"
            />
            <CardContent>
                {/* <TextField
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
                /> */}
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
                    <Grid item >
                        <Button
                            variant="contained"
                            color="primary"
                        // onClick={() => props.signup(email, password, username, firstName, lastName, userCity, userStateCode, props.router.history)}
                        >
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
        // signin(email, password, reroute) {
        //     axios.post("/v1/auth/signin", { email, password }).then(res => {
        //         console.log(res.data)
        //         dispatch(updateAuth({
        //             token: res.data.token,
        //             username: res.data.username,
        //             firstName: res.data.firstName,
        //             lastName: res.data.lastName,
        //             userCity: res.data.userCity,
        //             userStateCode: res.data.userStateCode,
        //             numberSaved: res.data.numberSaved,
        //             numberApplied: res.data.numberSaved,
        //             userId: res.data._id,
        //             recentSearches: []
        //         }));
        //         reroute.push("/dashboard")
        //     }).catch(err => {
        //         console.error(err);
        //     })
        // }
    }
}

function mapStateToProps(state) {
    return { user: state.auth.user, email: state.auth.email }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));