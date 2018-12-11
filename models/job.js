const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobSite: { type: String, required: true },
    jobId: String,
    empId: String,
    easily: Boolean,
    jobField: String,
    jobLocation: String,
    companyImage: String,
    jobRating: String,
    salaryRange: String,
    minSalary: String,
    medSalary: String,
    maxSalary: String,
    jobCompany: String,
    positionTitle: String,
    employerId : String,
    jobReqId : String,
    jobDescription : String,
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;