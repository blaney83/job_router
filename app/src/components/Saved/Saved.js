import React, { useState, Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import store from "../../state";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { searchJobs } from "../../state/search/actions";
import CardContent from '@material-ui/core/CardContent';
import { getSaved } from "../../state/saved/actions"
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
import NoSaved from "../../components/Holders/NoSaved"

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



function Saved(props) {
    const { classes } = props;
    const [savedResults, setSavedResults] = useState(props.saved.savedResults);
    const [savedLoaded, setSavedLoaded] = useState(props.saved.savedLoaded);
    if (savedResults === 0) {
        props.getSaved("5c148efcb2d70e3ae0325019", setSavedResults, setSavedLoaded)
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
                                        // replace the long string below with props.auth.user.userId "5c148efcb2d70e3ae0325019"
                                        onClick={(e) => props.deleteJob(e.target.id, "5c148efcb2d70e3ae0325019", savedResults, setSavedResults)}
                                    >Delete</Button>
                                    <Button size="small" variant="contained"
                                        color={obj.hasApplied ? "primary" : "danger"}
                                        id={obj.jobId}
                                        // replace the long string below with props.auth.user.userId "5c148efcb2d70e3ae0325019"
                                        onClick={(e) => props.toggleApply(e.target.id, "5c148efcb2d70e3ae0325019", savedResults, setSavedResults)}
                                    >{obj.hasApplied ? "Already Applied" : "Mark as Applied"}</Button>
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
        deleteJob(jobId, userId, savedResults, setSavedResults) {
            console.log(userId)
            axios.delete("/v1/saved/" + jobId + "/" + userId).then(res => {
                console.log(res)
                if (res.status === 200) {
                    let updatedSaved = savedResults.filter((obj) => obj.jobId !== jobId)
                    dispatch(getSaved({
                        savedResults: updatedSaved,
                    }))
                    setSavedResults(updatedSaved)
                    alert("Job removed!")
                } else if (res.status === 202) {
                    alert("Job was already deleted!")
                }
            }).catch(err => {
                console.log(err.status)
                console.log("Error")
            })
        },
        toggleApply(jobId, userId, savedResults, setSavedResults) {
            console.log(userId)
            axios.put("/v1/saved/" + jobId + "/" + userId).then(res => {
                console.log(res)
                if (res.status === 200) {
                    let newArray = savedResults.map(obj=>obj.jobId=== jobId ?true:obj)
                    if(savedResults[newArray.indexOf(true)].hasApplied){
                        savedResults[newArray.indexOf(true)].hasApplied = false
                    } else{
                        savedResults[newArray.indexOf(true)].hasApplied = true
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