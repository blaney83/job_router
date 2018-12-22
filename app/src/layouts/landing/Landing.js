import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Signin from "../../components/Signin/Signin";
import Signup from '../../components/Signup/Signup';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import "./style.css"

const styles = () => ({
    root: {
        flexGrow: 1,
        height: "100vh",
    },
})

function LandingLayout(props) {
    const { classes } = props;
    return (
        <Grid container className={classes.root} alignItems="center">
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item xs={10}>
                        <Paper>
                            {props.location.pathname === "/signup" ? <Signup router={props}/> :  <Signin router={props}/>}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
LandingLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingLayout);