const router = require("express").Router();
const db = require("../../models");
const moment = require("moment")
// const jobController = require("../../controllers/jobController");


//Routes for /v1/user, this first route updates numberSaved, adds
router.put("/updateSaved", function (req, res) {
    console.log("hit")
    console.log(req.body.jobId)
    let newNumbersYay = fixMyProblems()
    console.log(newNumbersYay)
    db.User.findById(req.body.userId).then(userObj => {
        console.log(userObj.postingsSaved)
        let oldSavedChartDataArray = userObj.savedChartData
        let oldPostingsSaved = userObj.postingsSaved
        let trueOrFalseSavedAlready = oldPostingsSaved.indexOf(req.body.jobId)
        //could replace req.body.added with t/f >=0
        if (req.body.added) {
            oldSavedChartDataArray[newNumbersYay] = oldSavedChartDataArray[newNumbersYay] + 1
            console.log(oldSavedChartDataArray)
            db.User.findOneAndUpdate({ _id: req.body.userId }, { $inc: { numberSaved: 1 }, $push: { postingsSaved: req.body.jobId }, $set: { savedChartData: oldSavedChartDataArray } }, { new: true })
                .then(resp => {
                    console.log(resp)
                    res.status(200).json(resp)
                })
                .catch(err => err)
            //could replace req.body.added with t/f != -1
        } else if (!req.body.added) {
            oldSavedChartDataArray[newNumbersYay] = oldSavedChartDataArray[newNumbersYay] - 1
            oldPostingsSaved.splice(trueOrFalseSavedAlready, 1)
            console.log(oldSavedChartDataArray)
            db.User.findOneAndUpdate({ _id: req.body.userId }, { $inc: { numberSaved: -1 }, $set: { savedChartData: oldSavedChartDataArray, postingsSaved: oldPostingsSaved } }, { new: true })
                .then(resp => {
                    console.log(resp)
                    res.status(200).json(resp)
                })
                .catch(err => err)
        }
    }).catch(e => { e })
})

router.put("/updateApplied", function (req, res) {
    console.log("hit")
    console.log(req.body.jobId)
    let newNumbersYay = fixMyProblems()
    console.log(newNumbersYay)
    db.User.findById(req.body.userId).then(userObj => {
        // console.log(userObj.postingsSaved)
        let oldAppliedChartDataArray = userObj.appliedChartData
        let oldPostingsApplied = userObj.postingsApplied
        let trueOrFalseAppliedAlready = oldPostingsApplied.indexOf(req.body.jobId)
        //could replace req.body.added with t/f >=0
        if (req.body.added) {
            oldAppliedChartDataArray[newNumbersYay] = oldAppliedChartDataArray[newNumbersYay] + 1
            // console.log(oldSavedChartDataArray)
            db.User.findOneAndUpdate({ _id: req.body.userId }, { $inc: { numberApplied: 1 }, $push: { postingsApplied: req.body.jobId }, $set: { appliedChartData: oldAppliedChartDataArray } }, { new: true })
                .then(resp => {
                    console.log(resp)
                    res.status(200).json(resp)
                })
                .catch(err => err)
            //could replace req.body.added with t/f != -1
        } else if (!req.body.added) {
            oldAppliedChartDataArray[newNumbersYay] = oldAppliedChartDataArray[newNumbersYay] - 1
            oldPostingsApplied.splice(trueOrFalseAppliedAlready, 1)
            console.log(oldAppliedChartDataArray)
            db.User.findOneAndUpdate({ _id: req.body.userId }, { $inc: { numberApplied: -1 }, $set: { appliedChartData: oldAppliedChartDataArray, postingsApplied: oldPostingsApplied } }, { new: true })
                .then(resp => {
                    console.log(resp)
                    res.status(200).json(resp)
                })
                .catch(err => err)
        }
    }).catch(e => { e })
})

function fixMyProblems() {
    let storageIndex = 0
    switch (moment().format('dddd')) {
        case ("Sunday"):
            storageIndex = 0
            return (0)
        case ("Monday"):
            storageIndex = 1
            return (1)
        case ("Tuesday"):
            storageIndex = 2
            return (2)
        case ("Wednesday"):
            storageIndex = 3
            return (3)
        case ("Thursday"):
            storageIndex = 4
            return (4)
        case ("Friday"):
            storageIndex = 5
            return (5)
        case ("Saturday"):
            storageIndex = 6
            return (6)
        default:
            return
    }
}
router.put("/updateSearchStats", function (req, res) {
    console.log(req.body)
    let newSearchObject = {
        searchCity: req.body.searchCity,
        searchState: req.body.searchState,
        searchJob: req.body.searchJob,
    }
    db.User.findById(req.body.userId).then(userObj => {
        console.log(userObj)
        console.log(userObj.totalSearches)
        let oldRecentSearches = userObj.recentSearches
        if (oldRecentSearches > 4) {
            oldRecentSearches.splice(0, 1)
        }
        oldRecentSearches.push(newSearchObject)
        console.log(oldRecentSearches)
        db.User.findOneAndUpdate({ _id: req.body.userId }, { $set: { recentSearches: oldRecentSearches }, $inc: { totalSearches: 1} }, { new: true })
            .then(resp => {
                console.log(resp)
                res.status(200).json(resp)
            })
            .catch(e => e)
    }).catch(e => e)
})

// router.patch("/updateViewed", function (req, res) {
//     console.log(req.body)
// })

// router.patch("/updateSearches", function (req, res) {
//     console.log(req.body)
// })


module.exports = router;

// module.exports = router