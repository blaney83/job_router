const router = require("express").Router();
const db = require("../../models");
const jwt = require("jwt-simple");
const config = require("../../config");
const passport = require("passport");
const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

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
    res.json({ token: tokenizer(req.user) });
});

router.post("/signup", function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).send({ error: "You must provide an email and password" });
    }

    db.User.findOne({ email })
        .then(dbuser => {
            // if the user exists return an error
            if (dbuser) {
                return res.status(422).send({ error: "Email already in use" });
            }
            //create new user object
            const user = new db.User({ email, password });
            // save the user
            user.save().then(user => {
                console.log(user);
                // respond with the success if the user existed
                res.json({ token: tokenizer(user) });
            });
        })
        .catch(err => {
            return next(err);
        });
});

module.exports = router;