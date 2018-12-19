const db = require("../models");

module.exports = {

    findAll: function (req, res) {
        // console.log("we hittin")

        let userId = req.params.userId
        db.Saved.find({ "userId": userId })
            .then(dbModel => {
                // console.log(dbModel)
                res.send(dbModel)
            })
            .catch(e => e)
    },

    create: function (req, res) {
        // console.log("we hittin")
        let idP = req.params.id
        let userId = req.params.userId
        db.Saved.findOne({ "_id": userId }).then(info => {
            if (info === null) {


                db.Job.findOne({ "jobId": idP }).then(info => {
                    // console.log(info)
                    let savedObj = {
                        isSaved: true,
                        hasApplied: false,
                        userId: userId
                    }
                    savedObj.jobSite = info.jobSite ? info.jobSite : null
                    savedObj.jobId = info.jobId ? info.jobId : null
                    savedObj.empId = info.empId ? info.empId : null
                    savedObj.easily = info.easily ? info.easily : null
                    savedObj.jobField = info.jobField ? info.jobField : null
                    savedObj.jobLocation = info.jobLocation ? info.jobLocation : null
                    savedObj.jobField = info.jobField ? info.jobField : null
                    savedObj.companyImage = info.companyImage ? info.companyImage : null
                    savedObj.jobRating = info.jobRating ? info.jobRating : null
                    savedObj.salaryRange = info.salaryRange ? info.salaryRange : null
                    savedObj.minSalary = info.minSalary ? info.minSalary : null
                    savedObj.maxSalary = info.maxSalary ? info.maxSalary : null
                    savedObj.jobCompany = info.jobCompany ? info.jobCompany : null
                    savedObj.positionTitle = info.positionTitle ? info.positionTitle : null
                    savedObj.employerId = info.employerId ? info.employerId : null
                    savedObj.jobReqId = info.jobReqId ? info.jobReqId : null
                    savedObj.jobDescription = info.jobDescription ? info.jobDescription : null
                    // console.log(savedObj)
                    db.Saved
                        .create(savedObj)
                        .then(dbModel => res.status(200).json(dbModel))
                        .catch(err => res.status(422).json(err));
                }).catch(err => res.status(422).json(err))
            } else { res.status(202).send("Already Saved!")}
        })
    },

    update: function (req, res) {
        // console.log("this works")
        let idP = req.params.id
        let userId = req.params.userId
        db.Saved.findOne({ "userId": userId, "jobId": idP })
            .then(resp => {
                // console.log(resp.hasApplied)
                // console.log(resp._id)
                let newAppliedValue = true
                if (resp.hasApplied == true) {
                    newAppliedValue = false
                }
                // console.log(newAppliedValue)
                db.Saved.updateOne({ _id: resp._id }, { hasApplied: newAppliedValue })
                    .then(resp => {
                        // console.log(resp)
                        if (resp.nModified > 0) {
                            if (newAppliedValue === false) {
                                res.status(200).send("Successfully Unapplied")
                            } else {
                                res.status(200).send("Successfully Applied")
                            }
                        } else {
                            res.status(202).send("Sorry, we couldn't find that job.")
                        }
                    })
                    .catch(e => e)
            })
            .catch(e => e)
    },

    delete: function (req, res) {
        let idP = req.params.id
        let userId = req.params.userId
        db.Saved.deleteOne({ "jobId": idP, "userId": userId })
            .then(resp => {
                // console.log(resp)
                if (resp.n == 0) {
                    res.status(202).send("Could not find that saved job")
                } else {
                    res.status(200).send("Job successfully deleted from saved")
                }
            })
    }
}
