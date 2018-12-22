
const axios = require("axios")

async function glassGetData(search, loc, numb) {
    try {
        let lP1 = loc.split(",")
        let lP2 = lP1[0].toLowerCase()
        if (lP2.includes(" ")) {
            lP2 = lP2.replace(/ /g, "-")
        }
        let sP1 = search.trim()
        let sP2 = sP1.toLowerCase()
        if (sP2.includes(" ")) {
            sP2 = sP2.replace(/ /g, "-")
        }
        let locCode = "33904"
        if (lP2 == "seattle") {
            locCode = "50505"
        } else if (lP2 == "new-york") {
            locCode = "32348"
        } else if (lP2 == "scottsdale") {
            locCode = "33911"
        } else if (lP2 == "chandler") {
            locCode = "33878"
        } else if (lP2 == "mesa") {
            locCode = "33897"
        } else if (lP2 == "los-angeles") {
            locCode = "46821"
        } else if (lP2 == "san-diego") {
            locCode = "47311"
        } else if (lP2 == "san-francisco") {
            locCode = "47401"
        } else if (lP2 == "san-jose") {
            locCode = "47436"
        } else if (lP2 == "bellevue") {
            locCode = "50442"
        } else if (lP2 == "redmond") {
            locCode = "50499"
        } else if (lP2 == "portland") {
            locCode = "51614"
        } else if (lP2 == "chicago") {
            locCode = "47436"
        } else if (lP2 == "dallas") {
            locCode = "39977"
        } else if (lP2 == "houston") {
            locCode = "40171"
        } else if (lP2 == "austin") {
            locCode = "39761"
        } else if (lP2 == "boston") {
            locCode = "54532"
        } else if (lP2 == "philadelphia") {
            locCode = "52672"
        } else if (lP2 == "washington") {
            locCode = "38213"
        }
        let searCode = "KO8,25"
        if (sP2 == "software-developer" || sP2 == "back-end-developer" || sP2 == "front-end-engineer") {
            searCode = "KO8,26"
        } else if (sP2 == "web-developer") {
            searCode = "KO8,21"
        } else if (sP2 == "web-designer") {
            searCode = "KO8,20"
        } else if (sP2 == "front-end-developer" || sP2 == "javascript-engineer") {
            searCode = "KO8,27"
        } else if (sP2 == "javascript-developer") {
            searCode = "KO8,28"
        } else if (sP2 == "python-developer") {
            searCode = "KO8,24"
        } else if (sP2 == "python-engineer") {
            searCode = "KO8,23"
        }
        let glassPromiseHolder = []
        for (var carI = 1; carI < numb; carI++) {
            let builtURL = "https://www.glassdoor.com/Job/" + lP2 + "-" + sP2 + "-jobs-SRCH_IL.0,7_IC11" + locCode + "_" + searCode + "_IP" + carI + ".htm"
            glassPromiseHolder[carI - 1] = axios(builtURL).catch(err=>console.log("err"))
        }
        let glassDataArray = []
        await Promise.all(glassPromiseHolder)
        .catch(err=>glassPromiseHolder)
        .then(unfilteredResp => {
            let respArr = unfilteredResp.filter(data=>data!==undefined)
            let parseDataPromiseArr = []
            respArr.forEach((val, i) => {
                parseDataPromiseArr[i] = new Promise (function(resolve, reject){
                    resolve(glassUpSomeData(val))
                })
            })
            Promise.all(parseDataPromiseArr).then(resp=>{
                resp.map(val=>{
                    glassDataArray.push(val)
                })
            })
        })
        return(glassDataArray)
    } catch{ e => e}
}

function glassUpSomeData(resp) {
    let xyz = resp.data.split('<div id="MainColSummary" class="hideHH">')
    let abc = xyz[1].split("<script")
    let zwt = abc[0].split('<td class="job_title">')
    let jDesc = zwt.splice(0, 1)
    let splitSplit = jDesc[0].split("<li class=\'jl\'")
    splitSplit.splice(0, 1)
    let looperArr = splitSplit.map(jd => jd.split("\'"))
    let glassObjHolder = []
    looperArr.map((jobArr, i) => {
        let jobObj = {
            jobSite: "GlassDoor",
            jobId: jobArr[1],
            empId: jobArr[3],
            easyApply: (jobArr[13]=== "true"?true:false),
            jobField: jobArr[15],
            jobLocation: jobArr[17],
            companyImage: jobArr[43],
            jobRating: jobArr[58],
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
        }else{
            jobObj.salaryRange = null;
            jobObj.minSalary = null;
            jobObj.medSalary = null;
            jobObj.maxSalary = null;
            jobObj.jobCompany = jobArr[53];
            jobObj.positionTitle = jobArr[78];
        }
        if(jobObj.jobCompany != null && jobObj.jobCompany.includes(" Logo")){
            let cutComp = jobObj.jobCompany.split(" Logo")
            jobObj.jobCompany = cutComp[0]
        }
        if(jobObj.jobCompany != null && jobObj.jobCompany.includes("&amp;")){
            jobObj.jobCompany = jobObj.jobCompany.replace("&amp;", "&")
        }
        if(jobObj.salaryRange != null){
            jobObj.salaryRange = handleBadData(jobObj.salaryRange)
        }
        if(jobObj.jobRating != null){
            jobObj.jobRating = handleBadData(jobObj.jobRating)
        }
        if(jobObj.positionTitle != null){
            jobObj.positionTitle = handleBadData(jobObj.positionTitle)
        }
        if(jobObj.jobDescription === undefined){
            jobObj.jobDescription = "Hey there! We are sorry that we don't have a description for this GlassDoor posting. We are currently working with them to make their API more accessible. To see more information, use the link to check out this post on their site! Thanks!"
        }
        glassObjHolder.push(jobObj)
    })
    return (glassObjHolder)
}

function handleBadData(str) {
    let str1 = str.split('<')
    let str2 = str1[0].split(" ")
    return (str2[1])
}

module.exports = {
    glassGetData: glassGetData,
    glassUpSomeData: glassUpSomeData,
    handleBadData: handleBadData,
}