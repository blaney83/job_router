import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { changeSavedUserStats } from "../../state/auth/actions";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { CardHeader } from "@material-ui/core";
import { searchJobs, updateNumberResults } from "../../state/search/actions";
import { createMuiTheme } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import axios from "axios";
import PreSearch from "../../components/Holders/PreSearch"
import BadSearch from "../../components/Holders/BadSearch"
import CareerBuilder from "../../assets/img/careerbuilder.png"
import Dice from "../../assets/img/dice.png"
import Glassdoor from "../../assets/img/glassdoor.png"
import Indeed from "../../assets/img/indeed.png"
import USA from "../../assets/img/usa.png"
import Zip from "../../assets/img/zip.png"
import StarIcon from '@material-ui/icons/Star';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    card: {
        minWidth: 275,
    },
    card1: {
        minWidth: 275,
        "margin-bottom": "1rem"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    specialBox: {
        "max-width": "83.333333% !important",
        "flex-basis": "83.333333% !important",
    },
    badResult: {
        color: "grey",
        fontSize: 10,
    },
    smallMessages: {
        "max-width": "100% !important"
    },
    goodResult: {
        color: "green",
        fontSize: 16
    }
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f4511e',
        },
        secondary: {
            main: '#d84315',
        },
    },
});


function Search(props) {
    console.log(props)
    const { classes } = props;
    const [searchCity, setSearchCity] = useState(props.search.searchCity);
    const [searchState, setSearchState] = useState(props.search.searchState);
    const [searchJob, setSearchJob] = useState(props.search.searchJob);
    const [searchResults, setSearchResults] = useState(props.search.searchResults);
    const [numberResults, setNumberResults] = useState(props.search.numberResults);

    function chooseIcon(obj) {
        switch (true) {
            case (obj.jobSite === "CareerBuilder"):
                return (CareerBuilder)
            case (obj.jobSite === "Dice"):
                return (Dice)
            case (obj.jobSite === "GlassDoor"):
                return (Glassdoor)
            case (obj.jobSite === "Indeed"):
                return (Indeed)
            case (obj.jobSite === "USA Jobs"):
                return (USA)
            case (obj.jobSite === "ZipRecruiter"):
                return (Zip)
            default:
                return
        }
    }

    function displayResults() {
        console.log(props)
        console.log(searchResults.length)
        switch (true) {
            case (searchResults.length === 0):
                console.log("pre")
                return (<PreSearch props={props} />)
            case (searchResults.length === 1):
                console.log("fired")
                return (<BadSearch props={props} />)
            case (searchResults.length > 10):
                console.log("fired")
                return (
                    <List>
                        {
                            searchResults.map((obj, i) => {
                                if (numberResults >= i) {
                                    return (
                                        <Paper key={obj._id}>
                                            <ListItem alignItems="flex-start" key={obj._id}>
                                                <Grid container><Grid item xs={8}>
                                                    <Grid container><Grid item xs={2}>
                                                        <ListItemAvatar>
                                                            <Avatar alt={obj.companyName} src={obj.companyImage} />
                                                        </ListItemAvatar>
                                                    </Grid>
                                                        <Grid item xs={10} className={classes.specialBox}>
                                                            <ListItemText
                                                                primary={obj.positionTitle + "   " + obj.jobLocation + "   " + obj.jobCompany}
                                                                secondary={obj.jobDescription}
                                                            />
                                                        </Grid></Grid>
                                                </Grid>
                                                    <Grid item xs={4}>
                                                        <Grid container><Grid item xs={6}>
                                                            <Grid container direction="column"><Grid item xs={4} className={classes.smallMessages}>
                                                                <ListItemText
                                                                    secondary={obj.salaryRange ? <Typography variant="body" className={classes.goodResult} >{obj.salaryRange}</Typography> : <Typography className={classes.badResult} color="grey" variant="body">No Salary Info</Typography>}
                                                                />
                                                            </Grid>
                                                                <Grid item xs={4}>
                                                                    <ListItemText
                                                                        secondary={obj.jobRating ? <Typography variant="body" className={classes.goodResult}>{obj.jobRating}<StarIcon /></Typography> : <Typography></Typography>}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <ListItemText
                                                                        secondary={obj.easilyApply ? <Typography variant="body" className={classes.goodResult}>Fast Apply!</Typography> : <Typography variant="body" className={classes.badResult} color="grey"></Typography>}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                            <Grid item xs={6}>

                                                                <Button size="small" variant="contained"
                                                                    color="primary"
                                                                    id={obj.jobId}
                                                                    // replace the long string below with props.auth.user.userId
                                                                    onClick={(e) => props.saveJob(e.target.id, "5c148efcb2d70e3ae0325019")}
                                                                >Save</Button>
                                                                <Button size="small" variant="contained"
                                                                    color="primary"
                                                                    id={obj.jobId}
                                                                    href={obj.jobLink}
                                                                    target="_blank"
                                                                // replace the long string below with props.auth.user.userId
                                                                // onClick={(e) => props.saveJob(e.target.id, "5c148efcb2d70e3ae0325019")}
                                                                >Visit Site
                                                    <Avatar alt={obj.jobSite} src={chooseIcon(obj)} />
                                                                </Button>
                                                            </Grid></Grid>
                                                    </Grid></Grid>
                                            </ListItem>
                                        </Paper>
                                    )
                                }
                            })
                        }
                    </List>
                )
            default:
                // props.history.push("/dashboard/home")
                return
        }
    }

    return (
        <Grid container direction="column">
            <Grid item xsm={12}>
                <Card className={classes.card1}>
                    <CardHeader title="Search for Jobs"></CardHeader>
                    <CardContent>
                        <Typography variant="body1">Start your job search here! Enter the position you are interested in and the city and state you want to work in and hit the search button. We'll do the rest. We bring your the most relevant results for your job search from the 6 leading job-board sites! Use the filter options to control which jobs you see and the sort options to futher customize your results. Please excuse any incomplete data, we are always working to improve our site.</Typography>
                    </CardContent>
                    <CardContent>

                        <TextField
                            // id="standard-with-placeholder"
                            label="Job Title"
                            placeholder="Software Engineer"
                            className={classes.textField}
                            margin="normal"
                            value={searchJob}
                            onChange={(e) => setSearchJob(e.target.value)}
                        />
                        <TextField
                            // id="standard-with-placeholder"
                            label="City"
                            placeholder="San Francisco"
                            className={classes.textField}
                            margin="normal"
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                        />
                        <InputLabel htmlFor="age-simple">State</InputLabel>
                        <Select
                            value={searchState}
                            onChange={(e) => setSearchState(e.target.value)}
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
                        <Button size="small" variant="contained"
                            color="primary"
                            //nnnnnnnnnnnnnnnnnnnnnnnnnnnnnneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeedddddddddddddd to swap out this user id for props.user.userId
                            onClick={() => props.searchJobs(searchCity, searchState, searchJob, setSearchResults, "5c1864b85aa602347476c5e7")}
                        >Search</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xsm={12}>
                <Card className={classes.card}>
                    {displayResults()}
                </Card>
                <Button size="small" variant="contained"
                    color="primary"
                    onClick={() => props.showMore(numberResults, setNumberResults)}
                >Show more</Button>
                <Button size="small" variant="contained"
                    color="primary"
                    onClick={() => props.showLess(numberResults, setNumberResults)}
                >Show Less</Button>
            </Grid>
        </Grid>
    );
}

function mapDispatchToProps(dispatch) {
    const jobSearchMethods = {
        searchJobs(searchCity, searchState, searchJob, setSearchResults, userId) {
            let searchLocation = searchCity + ", " + searchState.toUpperCase()
            axios.post("/v1/job/" + searchLocation + "/" + searchJob).then(res => {
                setSearchResults(res.data)
                dispatch(searchJobs({
                    searchCity: searchCity,
                    searchState: searchState,
                    searchJob: searchJob,
                    searchResults: res.data,
                    // userCity: res.data.userCity,
                    // userStateCode: res.data.userStateCode,
                    // numberSaved: res.data.numberSaved,
                    // numberApplied: res.data.numberSaved,
                    // recentSearches: []
                }));
                // reroute.push("/dashboard")
            }).catch(err => {
                console.error(err);
            })
            // axios.post("/v1/user/updateSearchStats")
            axios(
                // "/v1/user/updateSaved"
            {
                method: "put",
                url: "/v1/user/updateSearchStats",
                data: {
                    searchJob: searchJob,
                    searchCity: searchCity,
                    searchState: searchState,
                    userId: userId
                }
            }).then(resp=>{
                console.log("searched the search")
                console.log(resp)
            })
        },

        saveJob(jobId, userId) {
            console.log(userId)
            axios.post("/v1/saved/" + jobId + "/" + userId).then(res => {
                console.log(res)
                if (res.status === 200) {
                    alert("Job saved!")
                } else if (res.status === 202) {
                    alert("Job previously saved!")
                }
            }).catch(err => {
                console.log(err.status)
                console.log("Error")

            })
            axios(
                // "/v1/user/updateSaved"
            {
                method: "put",
                url: "/v1/user/updateSaved",
                data: {
                    added: true,
                    userId: userId,
                    savedId: jobId
                }
            }
            ).then(resp=>{
                console.log("hit")
                dispatch(changeSavedUserStats({
                    numberSaved: resp.data.numberSaved,
                    savedChartData: resp.data.savedChartData,
                    postingsSaved: resp.data.postingsSaved
                }))
                console.log(resp)
            }).catch(err=>{console.log(err)})
        },
        showMore(numberResults, setNumberResults) {
            let newResults = numberResults + 15
            dispatch(updateNumberResults({
                numberResults: newResults
            }))
            setNumberResults(newResults)
        },
        showLess(numberResults, setNumberResults) {
            let newResults = numberResults - 15
            dispatch(updateNumberResults({
                numberResults: newResults
            }))
            setNumberResults(newResults)
        }
    }
    console.log(jobSearchMethods)
    return jobSearchMethods
}

function mapStateToProps(state) {
    return { user: state.auth.user, search: state.search }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(theme)(Search)));
