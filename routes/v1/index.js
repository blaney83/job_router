const router = require("express").Router();
const authRoutes = require("./auth")
const jobRoutes = require("./job")
const savedRoutes = require("./saved")

//this route will prepend to the routes in the folder
router.use("/auth", authRoutes)
router.use("/job", jobRoutes)
router.use("/saved", savedRoutes)

module.exports = router;