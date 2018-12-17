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
import Grid from '@material-ui/core/Grid';

import {
    firstChart,
} from "../Chart/Chart.js";

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
                        <ChartistGraph
                            className="ct-chart"
                            data={firstChart.data}
                            type="Line"
                            options={firstChart.options}
                            responsiveOptions={firstChart.responsiveOptions}
                            listener={firstChart.animation}
                        />
                    </Card>
                </Grid>
                <Grid item xsm={12} md={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h4" >Recent Searches</Typography>
                            <List className={classes.root}>
                                {[0, 1, 2, 3].map(value => (
                                    <ListItem key={value} role={undefined} dense button 
                                    // onClick={this.handleToggle(value)}
                                    >
                                        {/* <Checkbox
                                            checked={this.state.checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                        /> */}
                                        <ListItemText primary={`Line item ${value + 1}`} />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Comments">
                                                {/* <CommentIcon /> */}
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

export default connect(null, mapDispatchToProps)(withStyles(styles)(Main));
