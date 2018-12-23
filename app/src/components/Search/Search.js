import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { changeSavedUserStats, changeUserSearchInfo, updatePostingsViewed, updateCurrentFilters } from "../../state/auth/actions";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { CardHeader } from "@material-ui/core";
import { searchJobs, updateNumberResults, moreResults } from "../../state/search/actions";
import { createMuiTheme } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
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
import NewPost from '@material-ui/icons/FiberNew';
import Saved from '@material-ui/icons/Save';
import Applied from '@material-ui/icons/ThumbUp';
import Viewed from '@material-ui/icons/AccessTime';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
axios.defaults.timeout = 180000

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
        fontSize: 14
    },
    textField: {
        "margin-bottom": "0 !important"
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300,
    },
    CompanyName: {
        color: "#c84a03 !important",
        fontWeight: "bolder !important",
        fontSize: ".9rem"
    },
    PositionName: {
        fontSize: "1.2rem",
        fontWeight: "bold"
    },
    PositionLoc: {
        fontSize: ".9rem",
        fontWeight: "bold",
        color: "darkGrey",
        fontStyle: "italic"
    },
    header1: {
        backgroundImage: "linear-gradient(to right, #c24a04 , #ffe291); !important",
        // fontWeight: "bolder !important"
    },
    staticStatusHolder: {
        position: "absolute",
        bottom: "10px"
    },
    savedAlreadyColor: {
        color: "#b99900"
    },
    appliedAlreadyColor: {
        color: "green"
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
    const { classes } = props;
    const [searchCity, setSearchCity] = useState(props.search.searchCity);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [searchState, setSearchState] = useState(props.search.searchState);
    const [searchJob, setSearchJob] = useState(props.search.searchJob);
    const [searchResults, setSearchResults] = useState(props.search.searchResults);
    const [sortTag, setSortTag] = useState(props.user.sortTag);
    const [filterTag, setFilterTag] = useState(props.user.filterTag);
    const [siteTag, setSiteTag] = useState(props.user.siteTag);
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

    function checkPost(jobId) {
        if(jobId!== undefined){
            if (props.user.postingsApplied.indexOf(jobId) >= 0) {
                return (<Applied className={classes.appliedAlreadyColor}/>)
            } else if (props.user.postingsSaved.indexOf(jobId) >= 0) {
                return (<Saved className={classes.savedAlreadyColor}/>)
            } else if (props.user.postingsViewed.indexOf(jobId) >= 0) {
                return (<Viewed color="primary"/>)
            } else {
                return (<NewPost color="secondary"/>)
            }
        }
    }

    function savedButton(jobId, setOpen, setOpen2) {
        if (props.user.postingsSaved.indexOf(jobId) === -1) {
            return (<Button size="small" variant="contained"
            color="secondary"
            fullWidth={true}
            id={jobId}
            // id={obj.jobId}
            onClick={(e) => props.saveJob(e.currentTarget.id, props.user.userId, setOpen, setOpen2)}
        >Save</Button>)
        }else{
            return (<Button size="small" variant="contained"
            color="primary"
            fullWidth={true}
            id={jobId}
            disabled={true}
            // id={obj.jobId}
            // onClick={(e) => props.saveJob(e.target.id, props.user.userId, setOpen, setOpen2)}
        >Saved</Button>)
        }
    }

    function displayResults() {
        switch (true) {
            case (props.search.searchResults.length === 0):
                return (<PreSearch props={props} />)
            case (props.search.searchResults.length === 1):
                return (<BadSearch props={props} />)
            case (props.search.searchResults.length > 10):
                return (
                    <List>
                        {
                            props.search.searchResults.map((obj, i) => {
                                // searchResults.map((obj, i) => {
                                if (numberResults >= i) {
                                    return (
                                        <Paper key={i}>
                                            <ListItem key={obj._id}>
                                                <Grid container><Grid item xs={8}>
                                                    <Grid container alignItems="stretch"><Grid item xs={2}>
                                                        <Grid container direction="column" alignItems="center" justify="space-between"><Grid item xs={6}>
                                                            <ListItemAvatar>
                                                                <Avatar alt={obj.companyName} src={obj.companyImage} />
                                                            </ListItemAvatar>
                                                        </Grid><Grid item xs={6} className={classes.staticStatusHolder}>
                                                                {/* <ListItemAvatar> */}

                                                                    {checkPost(obj.jobId)}
                                                                    {/* <Avatar alt="posting status" src={checkPost(obj.jobId)} /> */}
                                                                {/* </ListItemAvatar> */}
                                                            </Grid></Grid>
                                                    </Grid>
                                                        <Grid item xs={10} className={classes.specialBox}>
                                                            <Typography variant="body1"><span className={classes.PositionName}>{obj.positionTitle}</span><span className={classes.PositionLoc}>{"   " + obj.jobLocation}</span> <br></br> <span className={classes.CompanyName}>{obj.jobCompany}</span></Typography>
                                                            <ListItemText
                                                                secondary={obj.jobDescription}
                                                            />
                                                        </Grid></Grid>
                                                </Grid>
                                                    <Grid item xs={4}>
                                                        <Grid container><Grid item xs={6}>
                                                            <Grid container direction="column" justify="space-between"><Grid item xs={12} className={classes.smallMessages}>
                                                                <ListItemText
                                                                    secondary={obj.salaryRange ? <Typography variant="body1" className={classes.goodResult} >{obj.salaryRange}</Typography> : <Typography className={classes.badResult} variant="body1"></Typography>}
                                                                />
                                                            </Grid>
                                                                <Grid item xs={12}>
                                                                    <ListItemText
                                                                        secondary={obj.jobRating ? <Typography variant="body1" className={classes.goodResult}>{obj.jobRating}<StarIcon fontSize="small"></StarIcon></Typography> : <Typography></Typography>}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <ListItemText
                                                                        secondary={obj.easilyApply ? <Typography variant="body1" className={classes.goodResult}>Fast Apply!</Typography> : <Typography variant="body1" className={classes.badResult} ></Typography>}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                            <Grid item xs={6}>
                                                                <Button size="small" variant="contained"
                                                                    color="primary"
                                                                    id={obj.jobId}
                                                                    fullWidth={true}
                                                                    href={obj.jobLink}
                                                                    target="_blank"
                                                                >Visit Site
                                                    <Avatar alt={obj.jobSite} src={chooseIcon(obj)} />
                                                                </Button>
                                                                {savedButton(obj.jobId, setOpen, setOpen2)}
                                                                {/* <Button size="small" variant="contained"
                                                                    color="secondary"
                                                                    fullWidth={true}
                                                                    id={obj.jobId}
                                                                    onClick={(e) => props.saveJob(e.target.id, props.user.userId, setOpen, setOpen2)}
                                                                >Save</Button> */}
                                                                <Snackbar
                                                                    className={classes.GoodAlert}
                                                                    anchorOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'center',
                                                                    }}
                                                                    open={open}
                                                                    onClose={() => setOpen(false)}
                                                                    autoHideDuration={1500}
                                                                    // onClose={this.handleClose}
                                                                    ContentProps={{
                                                                        'aria-describedby': 'message-id',
                                                                    }}
                                                                    message={<span id="message-id">Job Saved!</span>}
                                                                />
                                                                <Snackbar
                                                                    className={classes.BadAlert}
                                                                    anchorOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'center',
                                                                    }}
                                                                    open={open2}
                                                                    onClose={() => setOpen2(false)}
                                                                    autoHideDuration={1500}
                                                                    // onClose={this.handleClose}
                                                                    ContentProps={{
                                                                        'aria-describedby': 'message-id',
                                                                    }}
                                                                    message={<span id="message-id">Job already Saved!</span>}
                                                                />
                                                            </Grid></Grid>
                                                    </Grid></Grid>
                                            </ListItem>
                                        </Paper>
                                    )
                                } else {
                                    //something if number results is less than i
                                }
                            })
                        }
                    </List>
                )
            default:
                return
        }
    }
    const sortTagOptions = [
        'Job Site',
        'Salary',
    ];

    const filterTagOptions = [
        'Hide Viewed',
        'Hide Saved',
        'Hide Applied',
    ];

    const siteOptions = [
        'CareerBuilder',
        'Dice',
        'GlassDoor',
        'Indeed',
        'USA Jobs',
        'ZipRecruiter',
    ];

    return (
        <Grid container direction="column">
            <Grid item xsm={12}>
                <Card className={classes.card1}>
                    <CardHeader title="Search for Jobs"
                        titleTypographyProps={{ variant: "h4" }}
                        className={classes.header1}
                    ></CardHeader>
                    <CardContent>
                        {/* <Typography variant="body1"> */}
                        Start your job search here! Enter the position you are interested in and the city and state you want to work in and hit the search button. We'll do the rest. We bring your the most relevant results for your job search from the 6 leading job-board sites! Use the filter options to control which jobs you see and the sort options to futher customize your results. Please excuse any incomplete data, we are always working to improve our site.
                        {/* </Typography> */}
                    </CardContent>
                    <CardContent>
                        <Grid container alignItems="flex-end" justify="center">
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    label="Job Title"
                                    placeholder="Software Engineer"
                                    className={classes.textField}
                                    margin="normal"
                                    fullWidth={true}
                                    value={searchJob}
                                    onChange={(e) => setSearchJob(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    label="City"
                                    placeholder="San Francisco"
                                    className={classes.textField}
                                    margin="normal"
                                    fullWidth={true}
                                    value={searchCity}
                                    onChange={(e) => setSearchCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <InputLabel htmlFor="age-simple">State</InputLabel>
                                <Select
                                    value={searchState}
                                    fullWidth={true}
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
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-start" justify="flex-start">
                            <Grid item xs={12}>
                                <Button size="small" variant="contained"
                                    color="primary"
                                    onClick={() => props.searchJobs(searchCity, searchState, searchJob, setSearchResults, props.user.userId)}
                                >Search</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardContent>
                        <Grid container alignItems="flex-end" justify="space-around">
                            <Grid item xs={12} sm={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Sort</InputLabel>
                                    <Select
                                        fullWidth={true}
                                        multiple
                                        value={sortTag}
                                        onChange={e => setSortTag(e.target.value)}
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(', ')}
                                    >
                                        {sortTagOptions.map(tag => (
                                            <MenuItem key={tag} value={tag}>
                                                <Checkbox checked={sortTag.indexOf(tag) > -1} />
                                                <ListItemText primary={tag} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Filter</InputLabel>
                                    <Select
                                        fullWidth={true}
                                        multiple
                                        value={filterTag}
                                        onChange={e => setFilterTag(e.target.value)}
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(', ')}
                                    >
                                        {filterTagOptions.map(tag => (
                                            <MenuItem key={tag} value={tag}>
                                                <Checkbox checked={filterTag.indexOf(tag) > -1} />
                                                <ListItemText primary={tag} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Sources</InputLabel>
                                    <Select
                                        fullWidth={true}
                                        multiple
                                        value={siteTag}
                                        onChange={e => setSiteTag(e.target.value)}
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(', ')}
                                    >
                                        {siteOptions.map(tag => (
                                            <MenuItem key={tag} value={tag}>
                                                <Checkbox checked={siteTag.indexOf(tag) > -1} />
                                                <ListItemText primary={tag} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="flex-end" justify="center">
                            <Grid item xs={12}>
                                <Button size="small" variant="contained"
                                    color="primary"
                                    onClick={() => props.handleSorts(sortTag, setSortTag, filterTag, setFilterTag, siteTag, setSiteTag, numberResults, setNumberResults, searchResults, setSearchResults, props.user.postingsViewed, props.user.postingsSaved, props.user.postingsApplied, updatePostingsViewed, changeUserSearchInfo, changeSavedUserStats, props.user.userId, false, updateCurrentFilters, props.postingsViewed)}
                                >Sort</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid >
            <Grid item xsm={12}>
                <Card className={classes.card}>
                    {displayResults()}
                    <CardActions>
                        <Grid container direction="row" alignItems="center" justify="space-between">
                            <Grid item >
                                <Button size="small" variant="contained"
                                    color="primary"
                                    onClick={() => (sortTag.length === 0 && filterTag.length === 0 && siteTag.length === 0) ? props.showMore(props.search.searchResults, setSearchResults, props.user.userId, props.search.numberResults, setNumberResults) : props.handleSorts(sortTag, setSortTag, filterTag, setFilterTag, siteTag, setSiteTag, numberResults, setNumberResults, searchResults, setSearchResults, props.user.postingsViewed, props.user.postingsSaved, props.user.postingsApplied, updatePostingsViewed, changeUserSearchInfo, changeSavedUserStats, props.user.userId, true, updateCurrentFilters)}
                                >Show more</Button></Grid>
                            <Grid item >
                                <Button size="small" variant="contained"
                                    color="primary"
                                                        // clearSearch(setSearchCity, setSearchState, setSearchJob, setSearchResults, setSortTag, setFilterTag, setSiteTag, setNumberResults, updateCurrentFilters, searchJobs, updateNumberResults, props) {
                                    onClick={() => props.clearSearch(setSearchCity, setSearchState, setSearchJob, setSearchResults, setSortTag, setFilterTag, setSiteTag, setNumberResults, updateCurrentFilters, searchJobs, updateNumberResults, props)}
                                >Clear Search</Button>
                            </Grid>
                            <Grid item >
                                <Button size="small" variant="contained"
                                    color="primary"
                                    onClick={() => props.showLess(props.search.numberResults, setNumberResults)}
                                >Show Less</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid >
    );
}

function mapDispatchToProps(dispatch) {
    const jobSearchMethods = {
        searchJobs(searchCity, searchState, searchJob, setSearchResults, userId, postingsViewed) {
            setSearchResults([])
            let searchLocation = searchCity + ", " + searchState.toUpperCase()
            let data = {
                userId: userId
            }
            axios.post("/v1/job/" + searchLocation + "/" + searchJob, data).then(res => {
                setSearchResults(res.data)
                dispatch(searchJobs({
                    searchCity: searchCity,
                    searchState: searchState,
                    searchJob: searchJob,
                    searchResults: res.data,
                }));
                let myArray = []
                res.data.forEach(jobObj => {
                    myArray.push(jobObj.jobId)
                })
                axios(
                    {
                        method: "put",
                        url: "/v1/user/updateViewed",
                        data: {
                            userId: userId,
                            viewed: myArray
                        }
                    }
                ).then(resp => {
                    dispatch(updatePostingsViewed({
                        postingsViewed: (resp.data !== 0 || resp.data !== "" || resp.data !== []) ? resp.data : postingsViewed
                    }))
                }).catch(err => { console.log(err) })
            }).catch(err => {
                console.error(err);
            })
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
                }).then(resp => {
                    dispatch(changeUserSearchInfo({
                        recentSearches: resp.data.recentSearches,
                        totalSearches: resp.data.totalSearches,
                    }))
                })
        },

        saveJob(jobId, userId, setOpen, setOpen2) {
            axios.post("/v1/saved/" + jobId + "/" + userId).then(res => {
                if (res.status === 200) {
                    setOpen(true)
                    axios(
                        // "/v1/user/updateSaved"
                        {
                            method: "put",
                            url: "/v1/user/updateSaved",
                            data: {
                                added: true,
                                userId: userId,
                                jobId: jobId
                            }
                        }
                    ).then(resp => {
                        dispatch(changeSavedUserStats({
                            numberSaved: resp.data.numberSaved,
                            savedChartData: resp.data.savedChartData,
                            postingsSaved: resp.data.postingsSaved
                        }))
                    }).catch(err => { console.log(err) })
                } else if (res.status === 202) {
                    alert("Job previously saved!")
                    setOpen2(true)
                }
            }).catch(err => {
                console.log("Error")
            })

        },
        showMore(searchResults, setSearchResults, userId, numberResults, setNumberResults, postingsViewed) {
            let newResults = numberResults + 15
            dispatch(updateNumberResults({
                numberResults: newResults
            }))
            setNumberResults(newResults)
            let data = {
                userId: userId
            }
            if (searchResults.length < newResults) {
                axios.patch("/v1/job/more/" + newResults, data).then(res => {
                    let newDataWoo = [...searchResults, ...res.data]
                    setSearchResults(newDataWoo)
                    dispatch(moreResults({
                        searchResults: newDataWoo,
                    }));
                    let myArray = []
                    res.data.forEach(jobObj => {
                        myArray.push(jobObj.jobId)
                    })
                    axios(
                        {
                            method: "put",
                            url: "/v1/user/updateViewed",
                            data: {
                                userId: userId,
                                viewed: myArray
                            }
                        }
                    ).then(resp => {
                        dispatch(updatePostingsViewed({
                            postingsViewed: (resp.data !== 0 || resp.data !== "" || resp.data !== []) ? resp.data : postingsViewed
                        }))
                    }).catch(err => { console.log(err) })
                }).catch(err => {
                    console.error(err);
                })
            }
        },
        showLess(numberResults, setNumberResults) {
            let newResults = numberResults - 15
            dispatch(updateNumberResults({
                numberResults: newResults
            }))
            setNumberResults(newResults)
        },
        handleSorts(sortTag, setSortTag, filterTag, setFilterTag, siteTag, setSiteTag, numberResults, setNumberResults, searchResults, setSearchResults, postingsViewed, postingsSaved, postingsApplied, updatePostingsViewed, changeUserSearchInfo, changeSavedUserStats, userId, showMore, updateCurrentFilters) {
            if (!(sortTag.length === 0 && filterTag.length === 0 && siteTag.length === 0)) {
                if (!showMore) {
                    numberResults = 15
                    dispatch(updateNumberResults({
                        numberResults: numberResults
                    }))
                    setNumberResults(numberResults)
                }
                else {
                    numberResults = numberResults + 15
                    dispatch(updateNumberResults({
                        numberResults: numberResults
                    }))
                    setNumberResults(numberResults)
                }
                dispatch(updateCurrentFilters({
                    sortTag: sortTag,
                    filterTag: filterTag,
                    siteTag: siteTag,
                }))
                setSortTag(sortTag)
                setFilterTag(filterTag)
                setSiteTag(siteTag)
                let data = {
                    sortTag: sortTag,
                    filterTag: filterTag,
                    siteTag: siteTag,
                    numberResults: numberResults,
                    searchResults: searchResults,
                    postingsViewed: postingsViewed,
                    postingsApplied: postingsApplied,
                    postingsSaved: postingsSaved,
                    userId: userId
                }
                axios.patch("/v1/job/sort/" + numberResults, data).then(resp => {
                    if (showMore && numberResults > 20) {
                        let newDataWoo = [...searchResults, ...resp.data]
                        setSearchResults(newDataWoo)
                        dispatch(moreResults({
                            searchResults: newDataWoo,
                        }));
                    } else {
                        setSearchResults(resp.data)
                        dispatch(moreResults({
                            searchResults: resp.data,
                        }));
                    }
                    let myArray = []
                    resp.data.forEach(jobObj => {
                        myArray.push(jobObj.jobId)
                    })
                    axios(
                        {
                            method: "put",
                            url: "/v1/user/updateViewed",
                            data: {
                                userId: userId,
                                viewed: myArray
                            }
                        }
                    ).then(resp => {
                        dispatch(updatePostingsViewed({
                            postingsViewed: (resp.data !== 0 || resp.data !== "" || resp.data !== []) ? resp.data : postingsViewed
                        }))
                    }).catch(err => { console.log(err) })
                })
            }
        },
        clearSearch(setSearchCity, setSearchState, setSearchJob, setSearchResults, setSortTag, setFilterTag, setSiteTag, setNumberResults, updateCurrentFilters, searchJobs, updateNumberResults, props) {
            console.log(props)
            dispatch(updateCurrentFilters({
                siteTag: [],
                filterTag: [],
                sortTag: []
            }))
            setSiteTag([])
            setFilterTag([])
            setSortTag([])
            dispatch(searchJobs({
                searchCity: "",
                searchState: "",
                searchJob: "",
                searchResults: [],
            }))
            setSearchCity("")
            setSearchState("")
            setSearchJob("")
            setSearchResults([])
            dispatch(updateNumberResults({
                numberResults: 15
            }))
            setNumberResults(15)
            console.log(props)
        },
    }
    return jobSearchMethods
}

function mapStateToProps(state) {
    return { user: state.auth.user, search: state.search }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(theme)(Search)));
