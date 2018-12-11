const router = require("express").Router();
const authRoutes = require("./auth")
const jobRoutes = require("./job")

//this route will prepend to the routes in the folder
router.use("/auth", authRoutes)
router.use("/job", jobRoutes)

module.exports = router;