let builtURL = "https://www.careerbuilder.com/jobs-software-engineer-in-phoenix,az"

const axios = require("axios")
const fs = require('fs')

axios(builtURL, {
    method: "GET"
}).then(resp => {
    let firstArr = resp.data.split("div class='jobs'>")
    firstArr.splice(0,1)
    let secArr = firstArr[0].split('jobs-email')
    secArr.splice(1,1)
    let finArr = secArr[0].split('job-row')
    let myInd = finArr.length -1
    finArr.splice(myInd, 1)
    finArr.splice(3,1)
    finArr.splice(0,1)
    finArr.map((val, i)=>{
        let easilyApply = false
        let idSplit = val.split('data-job-did="')
        let secIdSplit = idSplit[1].split('"')
        let linkSplit = val.split('href="')
        let secLinkSplit = linkSplit[1].split('">')
        let secPosSplit = secLinkSplit[1].split("<")
        let posAgeSplit = val.split("<em>")
        let secPosAgeSplit = posAgeSplit[1].split("</em>")
        let descSplit = val.split("<div class='job-description")
        let secDescSplit = descSplit[1].split("'>")
        let thirDescSplit = secDescSplit[1].split("</div>")
        let employerId = val.split('data-company-did="')
        let secEmployerId = employerId[1].split('"')
        let secEmpSplit = ["Classified"]
        let firEmpSplit = val.split("company-click")
        let locSplit = val.split("job-text'>")
        let secLocSplit = locSplit[2].split("<")
        if(firEmpSplit.length >1){
            let empSplit = firEmpSplit[1].split('">')
            secEmpSplit = empSplit[1].split("<")
        }
        if(val.includes("CAREERBUILDER APPLY")){
            easilyApply = true
        }
        let jobObj = {
            jobSite: "CareerBuilder",
            postingAge: regEx(secPosAgeSplit[0]),
            jobLink : "https://www.careerbuilder.com" + secLinkSplit[0],
            positionTitle: secPosSplit[0],
            easilyApply: easilyApply,
            jobId: secIdSplit[0],
            companyImage: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-35-512.png',
            employerId: secEmployerId[0],
            jobCompany: regEx(secEmpSplit[0]),
            jobLocation: regEx(secLocSplit[0]),
            salaryRange: null,
            jobDescription: regEx(thirDescSplit[0])
        }
        console.log(jobObj)
    })
    // fs.writeFile('log.txt', finArr[0], err=> console.log(err))
})

function regEx(str){
    let sN = str.replace(/>\n/g, "")
    let sY = sN.replace(/\n/g, " ")
    let s1 = sY.trim();
    let s2 = s1.replace(/<b>/g, "")
    let s3 = s2.replace(/<\/b>/g, "")
    let s4 = s3.replace(/&#x2F/g, "/")
    let s5 = s4.replace(/&nbsp;/g, "")
    let s6 = s5.replace(/&amp;/g, "&")
    let s7 = s6.replace(/&#x27;/g, "'")
    let s8 = s7.replace(/\'/g, "'")
    return(s8)
}