const router = require("express").Router();
const jobController = require("../../controllers/jobController");


//Routes for /v1/job
router.route("/:location/:search")
    //create the initial search and results
    .post(jobController.create)

module.exports = router