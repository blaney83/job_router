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
                            // console.log(dbModel)
                            let firstRespondersLoL = []
                            for(let ntm = 0; ntm < 15; ntm ++){
                                firstRespondersLoL.push(dbModel[ntm])
                            }
                            // console.log(fir)
                            res.json(firstRespondersLoL)
                        })
                        .catch(err => res.status(422).json(err));
                }).catch(err => res.status(422).json(err))
            }
            // res.send(dbMassiveArray)
        })

    },

    findMore: function (req, res) {
        let magicNumber = parseInt(req.params.number)
        db.Job.find({userId: req.body.userId}).limit(magicNumber)
            .then(moreJobPostings=>{
                let moreDataForChu = []
                for(let ntm = magicNumber-15; ntm < magicNumber; ntm ++){
                    moreDataForChu.push(moreJobPostings[ntm])
                }
                res.json(moreDataForChu)
            })
    }
}
