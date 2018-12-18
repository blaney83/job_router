const router = require("express").Router();
const authRoutes = require("./auth")
const jobRoutes = require("./job")
const savedRoutes = require("./saved")
const userRoutes = require("./user")

//this route will prepend to the routes in the folder
router.use("/auth", authRoutes)
router.use("/job", jobRoutes)
router.use("/saved", savedRoutes)
router.use("/user", userRoutes)

module.exports = router;