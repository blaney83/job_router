const db = require("../models");
const dataCalls = require("../dataCalls")

module.exports = {

    create: function(req, res) {
        db.Job
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
}
