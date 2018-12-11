const axios = require("axios")

function useGetData(search, loc, numb) {
    let sP1 = search.split(" ")
    let sP2 = sP1.map(str=> str.split())
    let sP3 = sP2.map(strArr=>strArr.map((letter, ind)=> ind ==0 ? letter.toUpperCase(): letter))
    let sP4 = sP3.map(strArr => strArr.join(""))
    let sP5 = sP4.join("%20")
    let lP1 = loc.split(", ")
    // console.log(lP1)
    let lP2 = lP1[0].split(" ")
    let lP25 = lP2.map(str=>str.split())
    let lP3 = lP25.map(strArr=>strArr.map((letter, ind)=> ind ==0 ? letter.toUpperCase(): letter))
    let lP4 = lP3.map(strArr => strArr.join(""))
    let lP5 = lP4.join("%20")
    let lP6 = lP1[1].toUpperCase()
    let lP7 = lP5 + ",%20" + lP6

    let reqSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://data.usajobs.gov/api/search?Keyword=" + sP5 + "&LocationName=" + lP7,
        "method": "GET",
        "headers": {
            "Host": "data.usajobs.gov",
            "User-Agent": "professionallaney@gmail.com",
            "Authorization-Key": "WIxKsGhPh9D0Ba0jhz39y+kbtmDLDCWNPmUmjMmJsOU=",
            "cache-control": "no-cache",
            "Postman-Token": "39643141-d8d9-4444-af02-1f6a799409a6",
        },
        // "data": "{\n\t\"media_name\": \"hello world\",\n\t\"creator\" : \"creator\",\n\t\"theory\" : \"We are all worthy of happiness.\"\n}"
    }


    let usaDataHolder = []
    axios(reqSettings).then(resp => {
        let jobsArr = resp.data.SearchResult.SearchResultItems
        // console.log(resp.data)
        // console.log(jobsArr.length)
        jobsArr.map((val, i) => {
            let jobObj = {
                jobSite: "USA Jobs",
                jobId: val.MatchedObjectId,
                positionId: val.MatchedObjectDescriptor.PositionID,
                easyApply: true,
                jobField: val.MatchedObjectDescriptor.JobCategory[0].Name,
                jobLocation: val.MatchedObjectDescriptor.PositionLocation.map(obj => obj.LocationName),
                companyImage: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-35-512.png',
                jobLink: val.MatchedObjectDescriptor.PositionURI,
                easyApplyLink: val.MatchedObjectDescriptor.ApplyURI[0],
                postingAge: val.MatchedObjectDescriptor.PublicationStartDate,
                salaryRange: "Code: " + val.MatchedObjectDescriptor.JobGrade[0].Code,
                jobCompany: val.MatchedObjectDescriptor.OrganizationName + ", " + val.MatchedObjectDescriptor.DepartmentName,
                positionTitle: val.MatchedObjectDescriptor.PositionTitle,
                jobDescription: val.MatchedObjectDescriptor.QualificationSummary
            }
            usaDataHolder.push(jobObj)
        })
        // console.log(usaDataHolder)
        return (usaDataHolder)
    })
    return([usaDataHolder])
}
//example call
// useGetData("software engineer", "Phoenix, az", 0)

module.exports = {
    usaGetData: useGetData
}