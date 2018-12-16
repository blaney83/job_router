const router = require("express").Router();
const savedController = require("../../controllers/savedController");

//Routes for /v1/saved
router.route("/:id?/:userId")
    //find all saved jobs for the user to display
    .get(savedController.findAll )
    //create the initial search and results
    .post(savedController.create)
    //update the applied status of the job
    .put(savedController.update)
    //create the initial search and results
    .delete(savedController.delete)

module.exports = router