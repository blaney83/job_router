import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import store from "../../state";
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { changeSavedUserStats, changeAppliedUserStats } from "../../state/auth/actions";
// import { searchJobs, updateNumberResults } from "../../state/search/actions";
import { getSaved } from "../../state/saved/actions"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import axios from "axios";
import NoSaved from "../../components/Holders/NoSaved"
import CareerBuilder from "../../assets/img/careerbuilder.png"
import Dice from "../../assets/img/dice.png"
import Glassdoor from "../../assets/img/glassdoor.png"
import Indeed from "../../assets/img/indeed.png"
import USA from "../../assets/img/usa.png"
import Zip from "../../assets/img/zip.png"
import StarIcon from '@material-ui/icons/Star';
import { CardHeader } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
// import { set } from "mongoose";


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
    },
    CompanyName: {
        color: "#c84a03 !important",
        fontWeight: "bolder !important",
        fontSize: ".9rem"
    },
    PositionName: {
        // color: "#c84a03 !important",
        // fontWeight: "bolder !important",
        fontSize: "1rem"
    }
};



function Saved(props) {
    const { classes } = props;
    const [savedResults, setSavedResults] = useState(props.saved.savedResults);
    const [savedLoaded, setSavedLoaded] = useState(props.saved.savedLoaded);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    // const [numberResults, setNumberResults] = useState(props.search.numberResults);
    if (props.saved.savedResults.length !== props.user.numberSaved) {
        props.getSaved(props.user.userId, setSavedResults, setSavedLoaded)
    }
    console.log(props.saved.savedResults.length)
    console.log(props.user.numberSaved)

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
        switch (true) {
            case (savedResults.length === 0):
                console.log("pre")
                return (<NoSaved props={props} />)
            // case (savedResults.length === 1):
            //     console.log("fired")
            //     return (<BadSearch props={props} />)
            case (savedResults.length > 0):
                console.log("fired")
                return (
                    <List>
                        {savedResults.map((obj, i) => {
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
                                                <Typography variant="body1"><span className={classes.PositionName}>{obj.positionTitle + "   " + obj.jobLocation}</span> <br></br> <span className={classes.CompanyName}>{obj.jobCompany}</span></Typography>
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
                                                                secondary={obj.easilyApply ? <Typography variant="body1" className={classes.goodResult}>Fast Apply!</Typography> : <Typography variant="body1" className={classes.badResult}></Typography>}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                    <Grid item xs={6}>

                                                        <Button size="small" variant="contained"
                                                            color="primary"
                                                            id={obj.jobId}
                                                            href={obj.jobLink}
                                                            target="_blank"
                                                            fullWidth={true}

                                                        // replace the long string below with props.auth.user.userId
                                                        // onClick={(e) => props.saveJob(e.target.id, "5c148efcb2d70e3ae0325019")}
                                                        >Visit Site
                                                    <Avatar alt={obj.jobSite} src={chooseIcon(obj)} />
                                                        </Button>

                                                        <Button size="small" variant="contained"
                                                            color={obj.hasApplied ? "primary" : "secondary"}
                                                            id={obj.jobId}
                                                            fullWidth={true}

                                                            // replace the long string below with props.auth.user.userId "5c148efcb2d70e3ae0325019"
                                                            onClick={(e) => props.toggleApply(e.target.id, props.user.userId, savedResults, setSavedResults)}
                                                        >{obj.hasApplied ? "Already Applied" : "Mark as Applied"}</Button>
                                                        <Button size="small" variant="contained"
                                                            color="primary"
                                                            id={obj.jobId}
                                                            fullWidth={true}

                                                            // replace the long string below with props.auth.user.userId "5c148efcb2d70e3ae0325019"
                                                            onClick={(e) => props.deleteJob(e.target.id, props.user.userId, savedResults, setSavedResults, setOpen, setOpen2)}
                                                        >Delete</Button>
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
                                                                    message={<span id="message-id">Job Deleted</span>}
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
                                                                    message={<span id="message-id">Job already removed</span>}
                                                                    
                                                                />
                                                    </Grid></Grid>
                                            </Grid></Grid>
                                    </ListItem>
                                </Paper>
                            )
                        })}
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
                    <CardHeader title="Your Saved Jobs"></CardHeader>
                    <CardContent>
                        <Typography variant="body1">View your saved jobs below! Use the links to Navigate to the listings and apply! Then come back to mark them as applied and keep track of your employment journey. Use the sort feature to choose which results you see first or use the filter feature to hide jobs you've already applied to! Once you delete a job from your saved jobs, it will no longer be linked to your account, so only delete jobs you aren't interested in applying to.</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xsm={12}>
                <Card className={classes.card}>
                    {displayResults()}
                </Card>
            </Grid>
        </Grid>
    )
}

function mapDispatchToProps(dispatch) {
    const savedMethods = {
        getSaved(userId, setSavedResults) {
            axios.get("/v1/saved/" + userId).then(res => {
                dispatch(getSaved({
                    savedResults: res.data,
                }));
                if (res.data === undefined) {
                    setSavedResults([])
                } else {
                    console.log(res.data)
                    setSavedResults(res.data)
                }
            }).catch(err => {
                console.error(err);
            })
            // }
        },
        //GOING TO BE REMOVE FROM SAVED FUNCTION
        deleteJob(jobId, userId, savedResults, setSavedResults, setOpen, setOpen2) {
            console.log(userId)
            axios.delete("/v1/saved/" + jobId + "/" + userId).then(res => {
                console.log(res)
                if (res.status === 200) {
                    let updatedSaved = savedResults.filter((obj) => obj.jobId !== jobId)
                    dispatch(getSaved({
                        savedResults: updatedSaved,
                    }))
                    setSavedResults(updatedSaved)
                    setOpen(true)
                } else if (res.status === 202) {
                    setOpen2(true)
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
                        added: false,
                        userId: userId,
                        jobId: jobId,
                        savedId: jobId
                    }
                }
            ).then(resp => {
                console.log("hit")
                dispatch(changeSavedUserStats({
                    numberSaved: resp.data.numberSaved,
                    savedChartData: resp.data.savedChartData,
                    postingsSaved: resp.data.postingsSaved
                }))
                console.log(resp)
            }).catch(err => { console.log(err) })
        },
        toggleApply(jobId, userId, savedResults, setSavedResults) {
            console.log(userId)
            axios.put("/v1/saved/" + jobId + "/" + userId).then(res => {
                console.log(res)
                if (res.status === 200) {
                    let newArray = savedResults.map(obj => obj.jobId === jobId ? true : obj)
                    if (savedResults[newArray.indexOf(true)].hasApplied) {
                        savedResults[newArray.indexOf(true)].hasApplied = false
                        console.log("true ")
                        axios(
                            // "/v1/user/updateSaved"
                            {
                                method: "put",
                                url: "/v1/user/updateApplied",
                                data: {
                                    added: false,
                                    userId: userId,
                                    jobId: jobId,
                                }
                            }
                        ).then(resp => {
                            dispatch(changeAppliedUserStats({
                                numberApplied: resp.data.numberApplied,
                                appliedChartData: resp.data.appliedChartData,
                                postingsApplied: resp.data.postingsApplied
                            }))
                            console.log(resp)
                        }).catch(err => { console.log(err) })
                    } else {
                        savedResults[newArray.indexOf(true)].hasApplied = true
                        axios(
                            // "/v1/user/updateSaved"
                            {
                                method: "put",
                                url: "/v1/user/updateApplied",
                                data: {
                                    added: true,
                                    userId: userId,
                                    jobId: jobId,
                                }
                            }
                        ).then(resp => {
                            dispatch(changeAppliedUserStats({
                                numberApplied: resp.data.numberApplied,
                                appliedChartData: resp.data.appliedChartData,
                                postingsApplied: resp.data.postingsApplied
                            }))
                            console.log(resp)
                        }).catch(err => { console.log(err) })
                    }
                    setSavedResults(savedResults)
                } else if (res.status === 202) {
                    alert("Oops! Something went wrong!")
                }
            }).catch(err => {
                console.log(err.status)
                console.log("Error")
            })

        }
    }
    return savedMethods
}

function mapStateToProps(state) {
    return { user: state.auth.user, saved: state.saved }
}

Saved.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Saved));