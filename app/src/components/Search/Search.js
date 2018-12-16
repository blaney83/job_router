import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { searchJobs } from "../../state/search/actions";
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
};




function Search(props) {
    console.log(props)
    const { classes } = props;
    const [searchCity, setSearchCity] = useState(props.search.searchCity);
    const [searchState, setSearchState] = useState(props.search.searchState);
    const [searchJob, setSearchJob] = useState(props.search.searchJob);
    const [searchResults, setSearchResults] = useState(props.search.searchResults);
    const [numberResults, setNumberResults] = useState(props.search.numberResults);

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
                                                <ListItemAvatar>
                                                    <Avatar alt={obj.companyName} src={obj.companyImage} />
                                                </ListItemAvatar>
                                            </ListItem>
                                            <ListItemText
                                                primary={obj.positionTitle + "   " + obj.jobLocation + "   " + obj.jobCompany}
                                                secondary={obj.jobDescription}
                                            />
                                            <Button size="small" variant="contained"
                                                color="primary"
                                                id={obj.jobId}
                                                // replace the long string below with props.auth.user.userId
                                                onClick={(e) => props.saveJob(e.target.id, "5c148efcb2d70e3ae0325019")}
                                            >Save</Button>
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
                    <TextField
                        // id="standard-with-placeholder"
                        label="State (2 letters)"
                        placeholder="CA"
                        className={classes.textField}
                        margin="normal"
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                    />
                    <CardActions>
                        <Button size="small" variant="contained"
                            color="primary"
                            onClick={() => props.searchJobs(searchCity, searchState, searchJob, setSearchResults)}
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
        searchJobs(searchCity, searchState, searchJob, setSearchResults) {
            console.log(searchJob)
            let searchLocation = searchCity + ", " + searchState.toUpperCase()
            axios.post("/v1/job/" + searchLocation + "/" + searchJob).then(res => {
                console.log(res.data)
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
        },
        showMore(numberResults, setNumberResults) {
            let newResults = numberResults + 15
            dispatch(searchJobs({
                numberResults: newResults
            }))
            setNumberResults(newResults)
        },
        showLess(numberResults, setNumberResults) {
            let newResults = numberResults - 15
            dispatch(searchJobs({
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search));


// import React, { useState } from "react";
// import { connect } from "react-redux";
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import { searchJobs } from "../../state/search/actions";
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import axios from "axios";
// import PreSearch from "../../components/Holders/PreSearch"
// import BadSearch from "../../components/Holders/BadSearch"

// const styles = {
//     card: {
//         minWidth: 275,
//     },
//     card1: {
//         minWidth: 275,
//         "margin-bottom": "1rem"
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// };




// function Search(props) {
//     console.log(props)
//     const { classes } = props;
//     const [searchCity, setSearchCity] = useState(props.search.searchCity);
//     const [searchState, setSearchState] = useState(props.search.searchState);
//     const [searchJob, setSearchJob] = useState(props.search.searchJob);
//     const [searchResults, setSearchResults] = useState(props.search.searchResults);
//     const [numberResults, setNumberResults] = useState(props.search.numberResults);

//     function displayResults() {
//         console.log(props)
//         console.log(searchResults.length)
//         switch (true) {
//             case (searchResults.length === 0):
//                 console.log("pre")
//                 return (<PreSearch props={props} />)
//             case (searchResults.length === 1):
//                 console.log("fired")
//                 return (<BadSearch props={props} />)
//             case (searchResults.length > 10):
//                 console.log("fired")
//                 return (
//                     <List>
//                         {
//                             searchResults.map((obj, i) => {
//                             return (
//                                 <Paper key={obj._id}>
//                                     <ListItem alignItems="flex-start" key={obj._id}>
//                                         <ListItemAvatar>
//                                             <Avatar alt={obj.companyName} src={obj.companyImage} />
//                                         </ListItemAvatar>
//                                     </ListItem>
//                                     <ListItemText
//                                         primary={obj.positionTitle + "   " + obj.jobLocation + "   " + obj.jobCompany}
//                                         secondary={obj.jobDescription}
//                                     />
//                                     <Button size="small" variant="contained"
//                                         color="primary"
//                                         id={obj.jobId}
//                                         // replace the long string below with props.auth.user.userId
//                                         onClick={(e) => props.saveJob(e.target.id, "5c148efcb2d70e3ae0325019")}
//                                     >Save</Button>
//                                 </Paper>
//                             )
//                         })
//                         }
//                     </List>
//                 )
//             default:
//                 // props.history.push("/dashboard/home")
//                 return
//         }
//     }

//     return (
//         <Grid container direction="column">
//             <Grid item xsm={12}>
//                 <Card className={classes.card1}>
//                     <TextField
//                         // id="standard-with-placeholder"
//                         label="Job Title"
//                         placeholder="Software Engineer"
//                         className={classes.textField}
//                         margin="normal"
//                         value={searchJob}
//                         onChange={(e) => setSearchJob(e.target.value)}
//                     />
//                     <TextField
//                         // id="standard-with-placeholder"
//                         label="City"
//                         placeholder="San Francisco"
//                         className={classes.textField}
//                         margin="normal"
//                         value={searchCity}
//                         onChange={(e) => setSearchCity(e.target.value)}
//                     />
//                     <TextField
//                         // id="standard-with-placeholder"
//                         label="State (2 letters)"
//                         placeholder="CA"
//                         className={classes.textField}
//                         margin="normal"
//                         value={searchState}
//                         onChange={(e) => setSearchState(e.target.value)}
//                     />
//                     <CardActions>
//                         <Button size="small" variant="contained"
//                             color="primary"
//                             onClick={() => props.searchJobs(searchCity, searchState, searchJob, setSearchResults)}
//                         >Search</Button>
//                     </CardActions>
//                 </Card>
//             </Grid>
//             <Grid item xsm={12}>
//                 <Card className={classes.card}>
//                     {displayResults()}
//                 </Card>
//             </Grid>
//         </Grid>
//     );
// }

// function mapDispatchToProps(dispatch) {
//     const jobSearchMethods = {
//         searchJobs(searchCity, searchState, searchJob, setSearchResults) {
//             console.log(searchJob)
//             let searchLocation = searchCity + ", " + searchState.toUpperCase()
//             axios.post("/v1/job/" + searchLocation + "/" + searchJob).then(res => {
//                 console.log(res.data)
//                 setSearchResults(res.data)
//                 dispatch(searchJobs({
//                     searchCity: searchCity,
//                     searchState: searchState,
//                     searchJob: searchJob,
//                     searchResults: res.data,
//                     // userCity: res.data.userCity,
//                     // userStateCode: res.data.userStateCode,
//                     // numberSaved: res.data.numberSaved,
//                     // numberApplied: res.data.numberSaved,
//                     // recentSearches: []
//                 }));
//                 // reroute.push("/dashboard")
//             }).catch(err => {
//                 console.error(err);
//             })
//         },

//         saveJob(jobId, userId) {
//             console.log(userId)
//             axios.post("/v1/saved/" + jobId + "/" + userId).then(res => {
//                 console.log(res)
//                 if (res.status === 200) {
//                     alert("Job saved!")
//                 } else if (res.status === 202) {
//                     alert("Job previously saved!")
//                 }
//             }).catch(err => {
//                 console.log(err.status)
//                 console.log("Error")

//             })
//         }
//     }
//     console.log(jobSearchMethods)
//     return jobSearchMethods
// }

// function mapStateToProps(state) {
//     return { user: state.auth.user, search: state.search }
// }

// Search.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search));