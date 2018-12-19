const router = require("express").Router();
const db = require("../../models");
const jwt = require("jwt-simple");
const config = require("../../config");
const passport = require("passport");
const requireSignin = passport.authenticate("local", { session: false, failureFlash: true });
const requireAuth = passport.authenticate("jwt", { session: false, failureFlash: true });

function tokenizer(user) {
    const timestamp = new Date().getTime();
    return jwt.encode(
        {
            sub: user.id,
            iat: timestamp
        },
        config.secret
    );
}

router.get("/", function (req, res) {
    res.send("Welcome to the v1 routes!");
});

router.get("/protected", requireAuth, function (req, res) {
    res.send("You have been protected!");
});

router.post("/signin", requireSignin, function (req, res) {
    const { email, password } = req.body
    db.User.findOne({ "email": email })
        .then(userResp => {
            let userResponse = {
                username: userResp.username,
                userId: userResp._id,
                firstName: userResp.firstName,
                lastName: userResp.lastName,
                userCity: userResp.userCity,
                userStateCode: userResp.userStateCode,
                numberSaved: userResp.numberSaved,
                numberApplied: userResp.numberApplied,
                savedChartData: userResp.savedChartData,
                appliedChartData: userResp.appliedChartData,
                postingsViewed: userResp.postingsViewed,
                postingsSaved: userResp.postingsSaved,
                postingsApplied: userResp.postingsApplied,
                recentSearches: userResp.recentSearches,
                token: tokenizer(userResp),
                totalSearches: userResp.totalSearches,
            }
            res.json(userResponse)
        })
});

router.post("/signup", function (req, res) {
    const { email, password, username, firstName, lastName, userCity, userStateCode } = req.body;
    if (!email || !password) {
        // console.log("this is broken")
        res.status(422).send({ error: "You must provide an email and password" });
    }

    db.User.findOne({ email })
        .then(dbuser => {
            // if the user exists return an error
            if (dbuser) {
                return res.status(422).send({ error: "Email already in use" });
            }
            //create new user object
            const user = new db.User({ email, password, username, firstName, lastName, userCity, userStateCode });
            // save the user
            user.save().then(user => {
                // respond with the success if the user existed
                let userResponse = {
                    username: user.username,
                    userId: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userCity: user.userCity,
                    userStateCode: user.userStateCode,
                    numberSaved: user.numberSaved,
                    numberApplied: user.numberApplied,
                    savedChartData: user.savedChartData,
                    appliedChartData: user.appliedChartData,
                    postingsViewed: user.postingsViewed,
                    postingsSaved: user.postingsSaved,
                    postingsApplied: user.postingsApplied,
                    recentSearches: user.recentSearches,
                    token: tokenizer(user),
                    totalSearches: user.totalSearches,
                }
                res.json(userResponse);
            });
        })
        .catch(err => {
            return next(err);
        });
});

module.exports = router;