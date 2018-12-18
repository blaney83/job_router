const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    username: { type: String, required: true, lowercase: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userCity: String,
    userStateCode: String,
    numberSaved: { type: Number, default: 0 },
    numberApplied: { type: Number, default: 0 },
    savedChartData: { type: Array, default: [0,0,0,0,0,0,0]},
    appliedChartData: { type: Array, default: [0,0,0,0,0,0,0]},
    postingsViewed: Array,
    postingsSaved: Array,
    postingsApplied: Array,
    recentSearches: Array,
    totalSearches: { type: Number, default: 0 },
});

// On save hook, encrypt password
UserSchema.pre("save", function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    });
});

// create a method to check a users password
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;