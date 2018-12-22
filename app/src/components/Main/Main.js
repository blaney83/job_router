import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import ChartistGraph from "react-chartist";
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import JobRouter from "../../assets/img/JobRouter.ico"
import ArrowForward from '@material-ui/icons/ArrowForward';
import {
    firstChart,
} from "../Chart/Chart.js";

const styles = {
    mainJRIcon: {
        "border-radius": "0 !important",
        "width": "60px !important",
        height: "60px !important"
    },
    redText: {
        color: "red",
        "font-weight": "bold"
    },
    orText: {
        color: "orange",
        "font-weight": "bold"
    },
    specialContent: {
        "padding-top": "0 !important",
    },
}

function Main(props) {
    const { classes } = props;
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    firstChart.data.series = [props.user.savedChartData, props.user.appliedChartData]
    return (
        <div>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar src={JobRouter} className={classes.mainJRIcon} />
                            }
                            title={props.user.firstName + "'s Job-Search Dashboard"}
                            titleTypographyProps={{ variant: "h4" }}
                            color="secondary"
                        />
                        <CardContent>
                            Welcome home! This is the command center for you and your Job Search! Track your progress to keep up the pressure and land your dream job. If you have any suggestions for useful information that would help your on your journey, send us your idea in the contact us section. Happy Hunting!
                </CardContent>
                    </Card>
                </Grid></Grid>
            <Grid container spacing={16}>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card} color="success">
                        <CardHeader title="Searches" />
                        <CardContent>
                            <Typography variant="h3" >{props.user.totalSearches}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardHeader title="Applied / Saved" />
                        <CardContent className={classes.specialContent}>
                            <Typography variant="h3" >{props.user.numberApplied} / {props.user.numberSaved}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                        <CardHeader title="Total Viewed" />
                        <CardContent>
                            <Typography variant="h3" >{props.user.postingsViewed.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardHeader title="This Week's Activity" />
                        <ChartistGraph
                            className="ct-chart"
                            data={firstChart.data}
                            type="Line"
                            options={firstChart.options}
                            responsiveOptions={firstChart.responsiveOptions}
                            listener={firstChart.animation}
                            plugins={firstChart.plugins.chartistPluginAxisTitle}
                        />
                        <CardContent className={classes.specialContent}>
                            <Typography variant="body1" align="center">
                                <span className={classes.redText}>
                                    Red:
                                </span>
                                Number of Saved Jobs<br />
                                <span className={classes.orText}>
                                    Orange:
                                </span>
                                Number of Applied Jobs
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardHeader title="Recent Searches" />
                        <CardContent>
                            <List className={classes.root}>
                                {props.user.recentSearches.map((searchObj, i) => (
                                    <ListItem key={i} role={undefined} dense button>
                                        <ListItemText primary={searchObj.searchJob + " jobs in " + searchObj.searchCity + ", " + searchObj.searchState} />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Comments">
                                                <ArrowForward />
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
