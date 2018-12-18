import React, { useState } from "react";
import { connect, getState } from "react-redux";
import { store } from "../../state";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { updateAuth } from "../../state/auth/actions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ChartistGraph from "react-chartist";
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import JobRouter from "../../assets/img/JobRouter.ico"
import ArrowForward from '@material-ui/icons/ArrowForward';

import {
    firstChart,
} from "../Chart/Chart.js";

const styles = () => ({

})

function Main(props) {
    // let state = store.getState()
    // console.log(state)
    const { classes } = props;
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    firstChart.data.series = [props.user.savedChartData, props.user.appliedChartData]
    return (
        <div>            
            <Grid container spacing="16">
                <Grid item xs={12}>
                {/* <Slide direction="up" mountOnEnter unmountOnExit> */}
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar src={JobRouter}/>
                            }
                            title={props.user.firstName + "'s Job-Search Dashboard"}
                            titleTypographyProps={{variant:"h5"}}
                        />
                        <CardContent>
                            Welcome home! This is the command center for you and your Job Search! Track your progress to keep up the pressure and land your dream job. If you have any suggestions for useful information that would help your on your journey, send us your idea in the contact us section. Happy Hunting!
                </CardContent>
                    </Card>
                    {/* </Slide> */}
                </Grid></Grid>
            <Grid container spacing="16">
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card} color="success">
                        <CardHeader title="Searches" />
                        <CardContent>
                            {/* <Typography variant="h4" >Number of Searches</Typography> */}
                            <Typography variant="h3" >{props.user.totalSearches}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardHeader title="Saved Jobs" />

                        <CardContent>
                            {/* <Typography variant="h4" >Number of Saved Jobs</Typography> */}
                            <Typography variant="h3" >{props.user.numberSaved}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardHeader title="Applied Jobs" />

                        <CardContent>
                            {/* <Typography variant="h4" >Number of Applied Jobs</Typography> */}
                            <Typography variant="h3" >{props.user.numberApplied}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing="16">
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardHeader title="Recent Activity" />
                        <ChartistGraph
                            className="ct-chart"
                            data={firstChart.data}
                            type="Line"
                            options={firstChart.options}
                            responsiveOptions={firstChart.responsiveOptions}
                            listener={firstChart.animation}
                            plugins={firstChart.plugins.chartistPluginAxisTitle}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardHeader title="Recent Searches" />
                        <CardContent>
                            {/* <Typography variant="h4" >Recent Searches</Typography> */}
                            <List className={classes.root}>
                                {props.user.recentSearches.map((searchObj, i)=> (
                                    <ListItem key={i} role={undefined} dense button
                                    // onClick={this.handleToggle(value)}
                                    >
                                        {/* <Checkbox
                                            checked={this.state.checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                        /> */}
                                        <ListItemText primary={searchObj.searchJob +" jobs in " + searchObj.searchCity + ", " + searchObj.searchState} />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Comments">
                                                <ArrowForward/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
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

}

function mapStateToProps(state) {
    return { user: state.auth.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main));
