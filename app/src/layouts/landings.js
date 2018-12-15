import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Signin from "../components/Signin/Signin";
import Signup from '../components/Signup/Signup';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';


const styles = () => ({
    root: {
        flexGrow: 1,
        height: "100vh"
    },
})

function LandingLayout(props) {
    const { classes } = props;
    return (
        <Grid container className={classes.root} alignItems="center" spacing={16}>
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item xs={10}>
                        <Paper>
                            {window.location === "/" ? <Signin></Signin> : <Signup></Signup>}
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