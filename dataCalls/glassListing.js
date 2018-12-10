
const axios = require("axios")

axios("https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=true&clickSource=searchBtn&typedKeyword=developer&sc.keyword=Software+Developer&locT=C&locId=1133904&jobType=", {
    method: "GET"
}).then(resp => {
    let xyz = resp.data.split('<div id="MainColSummary" class="hideHH">')
    let abc = xyz[1].split("<script")
    let zwt = abc[0].split('<td class="job_title">')
    let jDesc = zwt.splice(0, 1)
    let splitSplit = jDesc[0].split("<li class=\'jl\'")
    splitSplit.splice(0, 1)
    let looperArr = splitSplit.map(jd => jd.split("\'"))
    // looperArr[7].map(val=>console.log(val))
    looperArr.map((jobArr, i) => {
        console.log(i)
        let easyApp = false
        if(jobArr[13] == "true"){
            easyApp = true
        }
        let jobObj = {
            jobSite: "GlassDoor",
            jobId: jobArr[1],
            empId: jobArr[3],
            easilyApply: easyApp,
            jobField: jobArr[15],
            jobLocation: jobArr[17],
            companyImage: jobArr[43],
            jobRating: jobArr[58],
            // salaryRange: jobArr[102],
            // minSalary: jobArr[109],
            // medSalary: jobArr[111],
            // maxSalary: jobArr[113],
            // jobCompany: jobArr[115],
            // positionTitle: jobArr[119],
        }
        if (jobArr.length === 135 || jobArr.length === 127) {
            jobObj.salaryRange = jobArr[102];
            jobObj.minSalary = jobArr[109];
            jobObj.medSalary = jobArr[111];
            jobObj.maxSalary = jobArr[113];
            jobObj.jobCompany = jobArr[115];
            jobObj.positionTitle = jobArr[119];
        } else if (jobArr.length === 111 || jobArr.length === 107 || jobArr.length === 103) {
            jobObj.salaryRange = null;
            jobObj.minSalary = null;
            jobObj.medSalary = null;
            jobObj.maxSalary = null;
            jobObj.jobCompany = jobArr[53];
            jobObj.positionTitle = jobArr[78];
        } else if (jobArr.length === 131 && jobArr[96] === "><div><span class=") {
            jobObj.salaryRange = jobArr[98];
            jobObj.minSalary = jobArr[105];
            jobObj.medSalary = jobArr[107];
            jobObj.maxSalary = jobArr[109];
            jobObj.jobCompany = jobArr[111];
            jobObj.positionTitle = jobArr[115];
            jobObj.employerId = jobArr[113];
            jobObj.jobReqId = jobArr[119];
            jobObj.jobDescription = jobArr[130];
        } else if (jobArr.length === 131 || jobArr.length === 139) {
            jobObj.salaryRange = jobArr[106];
            jobObj.minSalary = jobArr[113];
            jobObj.medSalary = jobArr[115];
            jobObj.maxSalary = jobArr[117];
            jobObj.jobCompany = jobArr[119];
            jobObj.positionTitle = jobArr[123];
        } else if (jobArr.length === 113) {
            jobObj.salaryRange = jobArr[88];
            jobObj.minSalary = jobArr[95];
            jobObj.medSalary = jobArr[97];
            jobObj.maxSalary = jobArr[99];
            jobObj.jobCompany = jobArr[101];
            jobObj.positionTitle = jobArr[105];
            jobObj.employerId = jobArr[109];
            jobObj.jobReqId = jobArr[103];
            jobObj.jobDescription = jobArr[112];
        }
        console.log(jobArr.length)
        if(jobObj.jobCompany.includes(" Logo")){
            let cutComp = jobObj.jobCompany.split(" Logo")
            jobObj.jobCompany = cutComp[0]
        }
        if(jobObj.jobCompany.includes("&amp;")){
            jobObj.jobCompany = jobObj.jobCompany.replace("&amp;", "&")
        }
    //     if (i > 1) {
    //         let zwt2 = zwt[i-2].split(">")
    //         let tempArr = zwt2.map(val => val.split("<"))
    //         jobObj.jobPostition = tempArr[1][0];
    //         jobObj.jobCompany= tempArr[5][0];
    //         jobObj.jobLocation= tempArr[9][0];
    //         jobObj.salaryRange= tempArr[13][0];
    //     }
        // console.log(jobObj.jobCompany)
    })

    // //29 job listings 
    // console.log(zwt.length)
    // zwt.forEach(elem => {
    //     let zwt2 = elem.split(">")
    //     let tempArr = zwt2.map(val => val.split("<"))
    //     // console.log(tempArr)
    //     let jobObj = {
    //         jobPostition: tempArr[1][0],
    //         jobCompany: tempArr[5][0],
    //         jobLocation: tempArr[9][0],
    //         salaryRange: tempArr[13][0]
    //     }
    //     console.log(jobObj)
    // })
    // console.log(jDesc)
})
