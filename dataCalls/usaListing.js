
const config = require("../config");

let reqSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://data.usajobs.gov/api/search?Keyword=Software%20Development&LocationName=Seattle,%20WA",
    "method": "GET",
    "headers": {
        "Host": "data.usajobs.gov",
        "User-Agent": config.email,
        "Authorization-Key": config.usaKey,
        "cache-control": "no-cache",
        "Postman-Token": "39643141-d8d9-4444-af02-1f6a799409a6"
    },
    // "data": "{\n\t\"media_name\": \"hello world\",\n\t\"creator\" : \"creator\",\n\t\"theory\" : \"We are all worthy of happiness.\"\n}"
}

const axios = require("axios")

axios(reqSettings).then(resp => {
    let jobsArr = resp.data.SearchResult.SearchResultItems
    jobsArr.map((val, i) =>{
        let jobObj = {
            jobSite: "USA Jobs",
            jobId: val.MatchedObjectId,
            positionId: val.MatchedObjectDescriptor.PositionID,
            easyApply: true,
            jobField: val.MatchedObjectDescriptor.JobCategory[0].Name,
            jobLocation: val.MatchedObjectDescriptor.PositionLocation.map(obj=>obj.LocationName),
            companyImage: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-35-512.png',
            jobLink: val.MatchedObjectDescriptor.PositionURI,
            easyApplyLink: val.MatchedObjectDescriptor.ApplyURI[0],
            postingAge: val.MatchedObjectDescriptor.PublicationStartDate,
            salaryRange: "Code: " + val.MatchedObjectDescriptor.JobGrade[0].Code,
            jobCompany: val.MatchedObjectDescriptor.OrganizationName + ", " + val.MatchedObjectDescriptor.DepartmentName,
            positionTitle: val.MatchedObjectDescriptor.PositionTitle,
            jobDescription: val.MatchedObjectDescriptor.QualificationSummary
        }
        console.log(jobObj)
    })
})