const db = require("../models");
const dataCalls = require("../dataCalls")

module.exports = {

    create: function (req, res) {
        console.log("we hittin")
        let searchP = req.params.search
        let locationP = req.params.location
        let dataPromiseArr = [
            dataCalls.cbData.careerDataGet(searchP, locationP, 1),
            dataCalls.diData.diceDataGet(searchP, locationP, 1),
            dataCalls.glData.glassGetData(searchP, locationP, 1),
            dataCalls.inData.indeedGetData(searchP, locationP, 1),
            dataCalls.usData.usaGetData(searchP, locationP, 1),
            dataCalls.ziData.zipGetData(searchP, locationP, 1)
        ]
        Promise.all(dataPromiseArr).then(resp => {
            console.log("nice job ben")
            let dbMassiveArray = []
            resp.map((val, i) => val.map(val => val.map(val => dbMassiveArray.push(val))))
            db.Job.deleteMany({}).then(info=> {
                db.Job
                    .create(dbMassiveArray)
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
            }).catch(err => res.status(422).json(err))
            // res.send(dbMassiveArray)
        }) 

    },
}
