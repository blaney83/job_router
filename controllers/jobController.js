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
            if (resp.indexOf(undefined) >= 0 ) {
                console.log("happened")
                res.json([{ error: "bad search" }])
            } else {
                let mySortingArray = resp.map((val)=> val[0][0].jobSite)
                console.log("my sorting array", mySortingArray)
                let dbMassiveArray = []
                resp.map((val, i) => val.map(val => val.map(val => {
                    val.userId = req.body.userId
                    dbMassiveArray.push(val)
                })))
                db.Job.deleteMany({userId : req.body.userId}).then(info => {
                    console.log("well this happened")
                    db.Job
                        .create(dbMassiveArray)
                        .then(dbModel => {
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
        let mySortingArray = ["Dice", "GlassDoor"]
        let magicNumber = parseInt(req.params.number)
        db.Job.find({userId: req.body.userId})
        // .limit(magicNumber)
            .then(moreJobPostings=>{
                let newResponse = shuffleShuffle(moreJobPostings, magicNumber, mySortingArray)
                let senderResponse = newResponse.splice(magicNumber-16, 15)
                // for(let ntm = magicNumber-15; ntm < magicNumber; ntm ++){
                //     moreDataForChu.push(moreJobPostings[ntm])
                // }
                res.json(senderResponse)
            })
    },

    sortSite: function (req, res) {
        let mySortingArray = ["Dice", "GlassDoor"]
        let magicNumber = parseInt(req.params.number)
        db.Job.find({userId: req.body.userId})
        // .limit(magicNumber)
            .then(moreJobPostings=>{
                let newResponse = shuffleShuffle(moreJobPostings, magicNumber, mySortingArray)
                let senderResponse = newResponse.splice(magicNumber-16, 15)
                // for(let ntm = magicNumber-15; ntm < magicNumber; ntm ++){
                //     moreDataForChu.push(moreJobPostings[ntm])
                // }
                res.json(senderResponse)
            })
    }
}

function shuffleShuffle(arrOfObj, limit, mySortingArray){
    let firstRespondersLoL = []
    let sortingNumber = mySortingArray.length
    let secondSortingNumber = sortingNumber - 1
    let indexHolder = 0
    while(firstRespondersLoL.length < limit){
        firstRespondersLoL.push(arrOfObj.find(checkIfPasses))
        if(indexHolder < secondSortingNumber){
            indexHolder++
        }else{
            indexHolder = 0
        }
    }
    function checkIfPasses(obj){
        if(obj.jobSite === mySortingArray[indexHolder] && firstRespondersLoL.indexOf(obj) === -1){
            return(obj)
        }
    }
    return(firstRespondersLoL)
}
