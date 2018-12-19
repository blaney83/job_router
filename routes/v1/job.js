const router = require("express").Router();
const jobController = require("../../controllers/jobController");


//Routes for /v1/job
router.route("/:location/:search/:number?")
    //create the initial search and results
    .post(jobController.create)

router.route("/more/:number?")
    .patch(jobController.findMore)

router.route("/sort/:number?")
    .patch(jobController.sortSite)


module.exports = router