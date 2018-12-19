const db = require("../models");
const dataCalls = require("../dataCalls")

module.exports = {

    create: function (req, res) {
        console.log("we hittin")
        let searchP = req.params.search
        let locationP = req.params.location
        let dataPromiseArr = [
            // dataCalls.cbData.careerDataGet(searchP, locationP, 3),
            dataCalls.diData.diceDataGet(searchP, locationP, 3),
            dataCalls.glData.glassGetData(searchP, locationP, 3),
            // dataCalls.inData.indeedGetData(searchP, locationP, 3),
            // dataCalls.usData.usaGetData(searchP, locationP, 5),
            // dataCalls.ziData.zipGetData(searchP, locationP, 3)
        ]
        Promise.all(dataPromiseArr).then(resp => {
            console.log("nice job ben")
            if (resp.indexOf(undefined) >= 0) {
                console.log("happened")
                res.json([{ error: "bad search" }])
            } else {
                let mySortingArray = resp.map((val) => val[0][0].jobSite)
                console.log("my sorting array", mySortingArray)
                let dbMassiveArray = []
                resp.map((val, i) => val.map(val => val.map(val => {
                    // console.log(val)
                    // console.log(val.userId)
                    val.userId = req.body.userId
                    // console.log(val)
                    // console.log(val.userId)
                    dbMassiveArray.push(val)
                })))
                db.Job.deleteMany({ userId: req.body.userId }).then(info => {
                    console.log("well this happened")
                    db.Job
                        .create(dbMassiveArray)
                        .then(dbModel => {
                            console.log("well this happened2")
                            let firstReturn = shuffleShuffle(dbModel, 16, mySortingArray)
                            // console.log(firstReturn)
                            res.json(firstReturn)
                        })
                        .catch(err => res.status(422).json(err));
                }).catch(err => res.status(422).json(err))
            }
            // res.send(dbMassiveArray)
        })

    },

    findMore: function (req, res) {
        let mySortingArray = ["Dice", "GlassDoor"]
        let magicNumber = parseInt(req.params.number)
        db.Job.find({ userId: req.body.userId })
            // .limit(magicNumber)
            .then(moreJobPostings => {
                let newResponse = shuffleShuffle(moreJobPostings, magicNumber, mySortingArray)
                let senderResponse = newResponse.splice(magicNumber - 16, 15)
                // for(let ntm = magicNumber-15; ntm < magicNumber; ntm ++){
                //     moreDataForChu.push(moreJobPostings[ntm])
                // }
                res.json(senderResponse)
            })
    },

    sortSite: function (req, res) {
        let mySortingArray = ["Dice", "GlassDoor"]
        let myReferenceArray = mySortingArray
        let magicNumber = parseInt(req.params.number)

        db.Job.find({ userId: req.body.userId })
            // .limit(magicNumber)
            .then(moreJobPostings => {
                if (req.body.siteTag.length > 0) {
                    mySortingArray = [...req.body.siteTag]
                }
                let newResponse = shuffleShuffle(moreJobPostings, magicNumber, mySortingArray, req.body.postingsViewed, req.body.postingsSaved, req.body.postingsApplied, req.body.filterTag, myReferenceArray, req.body.siteTag)
                let senderResponse = newResponse.filter(obj=> obj !== undefined)
                if (senderResponse.length > 20) {
                    senderResponse = newResponse.splice(magicNumber - 16, 15)
                }
                res.status(200).json(senderResponse)

            })
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
    // console.log(firstRespondersLoL)
    return (firstRespondersLoL)
}
function shuffleBasic(mySortingArray, limit, allUserSearchData) {
    let firstRespondersLoL = []
    let limitHolder = limit
    if(limit > allUserSearchData.length/mySortingArray.length + 3){
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
        if(runnawayPreventer >= allUserSearchData.length){
            limitHolder = 0
        }
        runnawayPreventer ++
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