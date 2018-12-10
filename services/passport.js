const passport = require("passport");
const User = require("../models").User;
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Setup options for Local Strategy
const localOptions = {
    usernameField: "email"
};

// Create Local Strategy
const localLogin = new LocalStrategy(localOptions, function (
    email,
    password,
    done
) {
    // Verify email and password
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }
                // Otherwise call with false
                if (!isMatch) {
                    return done(null, false);
                }

                // Call done with correct email and password
                return done(null, user);
            });
        })
        .catch(err => {
            return done(err);
        });
});

// Setup options for JWT Strategy
const jwtOptions = {
    // extract the jwt token we created from the header
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    // pass in the jwt secret to decode the token
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user exist in the DB
    User.findById(payload.sub)
        .then(user => {
            // If the user exists, call the done function with that user
            if (user) {
                done(null, user);
            } else {
                // If not call the done function without a user object
                done(null, false);
            }
        })
        .catch(err => {
            // if there is an error call the done function with the err and no user
            return done(err, false);
        });
});

// Tell Passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);