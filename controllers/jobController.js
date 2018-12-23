const db = require("../models");
const dataCalls = require("../dataCalls")

module.exports = {

    create: function (req, res) {
        let searchP = req.params.search
        let locationP = req.params.location
        let dataPromiseArr = [
            //cb at 3 pages works and returns 50
            dataCalls.cbData.careerDataGet(searchP, locationP, 15),
            //dice at 3 works and returns 60
            dataCalls.diData.diceDataGet(searchP, locationP, 15),
            //glass at 3 works and returns 15, returns 15 at 4 too
            dataCalls.glData.glassGetData(searchP, locationP, 15),
            //indeed works at 3 and returns 32
            dataCalls.inData.indeedGetData(searchP, locationP, 15),
            //usa currently returns 4 (with search in arizona) as long as its called with another source
            // dataCalls.usData.usaGetData(searchP, locationP, 5),
            //zip currently works at 3 and returns 42
            dataCalls.ziData.zipGetData(searchP, locationP, 15)
        ]
        Promise.all(dataPromiseArr)
            .catch(err => {
                return (dataPromiseArr)
            })
            .then(resp => {
                if (resp.indexOf(undefined) >= 0) {
                    res.json([{ error: "bad search" }])
                } else {
                    // let filterCatch = resp.filter(val => val !== undefined)
                    // let filterCatch2 = filterCatch.map(val=> val.filter(val => val !== undefined))
                    // let mySortingArray = filterCatch2.map((val) => val[0][0] === undefined ? val[0].jobSite : val[0][0].jobSite)
                    let dbMassiveArray = []
                    resp.map((val, i) => {
                        // if (val[0][0] !== undefined) {
                            val.map(val => val.map(val => {
                                val.userId = req.body.userId
                                dbMassiveArray.push(val)
                            }))
                        // } else {
                        //     val.map(usaObj => {
                        //         usaObj.userId = req.body.userId
                        //         dbMassiveArray.push(usaObj)
                        //     })
                        // }
                    })

                    db.Job.deleteMany({ userId: req.body.userId }).then(info => {
                        db.Job
                            .create(dbMassiveArray)
                            .then(dbModel => {
                                let mySortingArray = ["CareerBuilder", "Dice", "Indeed", "GlassDoor", "ZipRecruiter"]
                                let firstReturn = shuffleShuffle(dbModel, 16, mySortingArray)
                                res.json(firstReturn)
                            })
                            .catch(err => res.status(422).json(err));
                    }).catch(err => res.status(422).json(err))
                }
                // res.send(dbMassiveArray)
            })

    },

    findMore: function (req, res) {
        let mySortingArray = ["CareerBuilder", "Dice", "ZipRecruiter"]
        let magicNumber = parseInt(req.params.number)
        db.Job.find({ userId: req.body.userId })
            // .limit(magicNumber)
            .then(moreJobPostings => {
                let newResponse = shuffleShuffle(moreJobPostings, magicNumber, mySortingArray)
                let senderResponse1 = newResponse.filter(obj => obj !== undefined)
                let senderResponse = senderResponse1.filter(obj => obj !== null)
                if (senderResponse.length > 20) {
                    senderResponse = newResponse.splice(magicNumber - 16, 15)
                }
                res.status(200).json(senderResponse)
            })
    },

    sortSite: function (req, res) {
        let mySortingArray = ["CareerBuilder", "Dice", "ZipRecruiter"]
        let myReferenceArray = mySortingArray
        let magicNumber = parseInt(req.params.number)
        db.Job.find({ userId: req.body.userId })
            // .limit(magicNumber)
            .then(moreJobPostings => {
                if (req.body.siteTag.length > 0) {
                    mySortingArray = [...req.body.siteTag]
                }
                let newResponse = shuffleShuffle(moreJobPostings, magicNumber, mySortingArray, req.body.postingsViewed, req.body.postingsSaved, req.body.postingsApplied, req.body.filterTag, myReferenceArray, req.body.siteTag)
                let senderResponse1 = newResponse.filter(obj => obj !== undefined)
                let senderResponse = senderResponse1.filter(obj => obj !== null)
                if (senderResponse.length > 20) {
                    senderResponse = newResponse.splice(magicNumber - 16, 15)
                }
                res.status(200).json(senderResponse)

            })
    },

    resetSort: function(req, res){
        db.Job
        .find({userId : req.params.number})
        .then(dbModel => {
            let mySortingArray = ["CareerBuilder", "Dice", "Indeed", "GlassDoor", "ZipRecruiter"]
            let firstReturn = shuffleShuffle(dbModel, 16, mySortingArray)
            res.json(firstReturn)
        })
        .catch(err => res.status(422).json(err));
    }
}

function shuffleShuffle(arrOfObj, limit, mySortingArray, postingsViewed, postingsSaved, postingsApplied, filterTag, myReferenceArray, siteTag) {
    let allUserSearchData = []
    let firstRespondersLoL = []
    if (postingsViewed !== undefined) {
        //everything thats not the first shuffle
        if (filterTag.length === 0) {
            //everything thats just a job site filter
            allUserSearchData = sortSite(arrOfObj, siteTag)
        }
        else {
            //everything to hide using filters
            if (filterTag.indexOf("Hide Viewed") >= 0) {
                allUserSearchData = sortSite(arrOfObj.filter(val => postingsViewed.indexOf(val.jobId) === -1), siteTag)
            } else if (filterTag.indexOf("Hide Saved") >= 0) {
                allUserSearchData = sortSite(arrOfObj.filter(val => postingsSaved.indexOf(val.jobId) === -1), siteTag)
            } else if (filterTag.indexOf("Hide Applied") >= 0) {
                allUserSearchData = sortSite(arrOfObj.filter(val => postingsApplied.indexOf(val.jobId) === -1), siteTag)
            } else {
                allUserSearchData = sortSite(arrOfObj, siteTag)
            }
        }
    } else {
        //for the basic first sort
        allUserSearchData = arrOfObj
    }
    if (postingsViewed === undefined) {
        //for the basic first sort
        firstRespondersLoL = shuffleBasic(mySortingArray, limit, allUserSearchData)
    } else {
        //for anything with filters or site params
        if (allUserSearchData.length === 0) {
            //defaults return to avoid crash
            let defaultCannotFind = {
                _id: "1111111111111111111",
                jobSite: "Default",
                jobLink: "https://www.job-router.heroku-app.com/dashboard/search",
                positionTitle: "Sorry, we cannot find any results for with the options you selected.",
                easilyApply: false,
                jobId: "11111111111111111111111",
                companyImage: "https://assets.dice.com/techpro/companies/brandMax/StateFarm/square-300.jpg",
                jobCompany: "",
                jobLocation: "",
                salaryRange: null,
                jobDescription: "Please modify your search and try again!",
                userId: "111111111111111111111111",
            }
            firstRespondersLoL.push(defaultCannotFind)
        } else {
            let myDynamicallyShuffledSortedFilteredArray = shuffleBasic(mySortingArray, limit, allUserSearchData)
            for (let fml = 0; fml < limit; fml++) {
                firstRespondersLoL.push(myDynamicallyShuffledSortedFilteredArray[fml])
            }
        }
    }
    return (firstRespondersLoL)
}
function shuffleBasic(mySortingArray, limit, allUserSearchData) {
    let firstRespondersLoL = []
    let limitHolder = limit
    if (limit > allUserSearchData.length / mySortingArray.length + 3) {
        limitHolder = limit - 16
    }
    let sortingNumber = mySortingArray.length
    let secondSortingNumber = sortingNumber - 1
    let indexHolder = 0
    let runnawayPreventer = 0
    while (firstRespondersLoL.length < limitHolder) {
        let potentialPosting = allUserSearchData.find(function (obj) {
            return (obj.jobSite === mySortingArray[indexHolder] && firstRespondersLoL.indexOf(obj) === -1)
        })
        if (potentialPosting !== null && potentialPosting !== undefined) {
            firstRespondersLoL.push(potentialPosting)
            if (indexHolder < secondSortingNumber) {
                indexHolder++
            } else {
                indexHolder = 0
            }
        } else {
            if (indexHolder < secondSortingNumber) {
                indexHolder++
            } else {
                indexHolder = 0
            }
        }
        if (runnawayPreventer >= allUserSearchData.length) {
            limitHolder = 0
        }
        runnawayPreventer++
    }
    return (firstRespondersLoL)
}

function sortSite(arrObj, siteTag) {
    if (siteTag.length !== 0 && siteTag !== undefined) {
        return (arrObj.filter(obj => {
            return (siteTag.indexOf(obj.jobSite) >= 0)
        }))
    } else {
        return (arrObj)
    }
}