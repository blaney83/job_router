
const axios = require("axios")

async function zipGetData(search, loc, numb) {
    try {
        let sP1 = search.toLowerCase()
        let sP2 = sP1.replace(/ /g, "%20")
        let lP1 = loc.split(", ")
        let state1 = lP1[1].toUpperCase()
        let lP2 = lP1[0].replace(/ /g, "%20")
        let lP3 = lP2 + "%2C%20" + state1
        let zipPromiseHolder = []
        for (var carI = 1; carI < numb; carI++) {
            let builtURL = "https://www.ziprecruiter.com/candidate/search?search=" + sP2 + "&location=" + lP3 + "&page=" + carI + "&radius=25"
            zipPromiseHolder[carI - 1] = axios(builtURL).catch(err=>console.log("zip"))
        }
        let zipDataArray = []
        await Promise.all(zipPromiseHolder)
        .catch(err=>zipPromiseHolder)
        .then(resp1 => {
            let resp = resp1.filter(data=>data!==undefined)
            resp.map(val => {
                zipDataArray.push(zipSomeData(val))
            })
        })
        return (zipDataArray)
    } catch{ e => e }
}

function zipSomeData(resp) {
    let zipDataHolder = []
    let secArr = resp.data.split('<body')
    let firstArr = secArr[1].split('<article class="job_result')
    firstArr.splice(0, 1)
    let xyz = firstArr[firstArr.length - 1].split('<div class="more_job_results"')
    firstArr.push(xyz[0])
    firstArr.forEach((val, i) => {
        let jSplit = val.split('href="')
        let linkSplit = jSplit[2].split('"')
        let titSplit = val.split('<h2 class="job_title">')
        let titeSplit = titSplit[1].split('">')
        let titleSplit = titeSplit[1].split("</")
        let imgSplit = val.split('<img src="')
        let secImgSplit = imgSplit[1].split('" alt')
        let compSplit = val.split('name">')
        let secCompSplit = compSplit[1].split("</")
        let locSplit = val.split('location">')
        let secLocSplit = locSplit[1].split('</')
        let paySplit = val.split('Pay</')
        let thirPaySplit = [null]
        let descSplit = val.split('nofollow">')
        let altDescSplit = val.split('target="_blank">\n')
        let secDescSplit = [null]
        if (descSplit.length > 1) {
            let tripDescSplit = descSplit[1].split("</a>")
            secDescSplit = [regEx(tripDescSplit[0])]
        }
        if (altDescSplit.length > 1) {
            let tripDescSplit = altDescSplit[1].split("</a>")
            secDescSplit = [regEx(tripDescSplit[0])]
        }
        if (paySplit.length > 1) {
            let secPaySplit = paySplit[1].split('">')
            thirPaySplit = secPaySplit[2].split('</')
        }
        let jobObj = {
            jobSite: "ZipRecruiter",
            jobLink: linkSplit[0],
            positionTitle: titleSplit[0],
            companyImage: secImgSplit[0],
            jobCompany: secCompSplit[0],
            jobLocation: secLocSplit[0],
            salaryRange: thirPaySplit[0],
            jobDescription: secDescSplit[0]
        }
        if (val.includes("Quick Apply")) {
            let quickArr = val.split('data-href="')
            let quickLink = quickArr[1].split('" d')
            jobObj.easyApply = true;
            jobObj.easyApplyLink = quickLink[0];
        } else {
            jobObj.easyApply = false;
        }
        zipDataHolder.push(jobObj)
    })
    return (zipDataHolder)
}

function regEx(str) {
    let s1 = str.trim();
    let s2 = s1.replace(/<b>/g, "")
    let s3 = s2.replace(/<\/b>/g, "")
    let s4 = s3.replace(/&#x2F/g, "/")
    let s5 = s4.replace(/&nbsp/g, "")
    let s6 = s5.replace(/&amp;/g, "&")
    let s7 = s6.replace(/&#x27;/g, "'")
    return (s7)
}

module.exports = {
    zipGetData: zipGetData,
    zipSomeData: zipSomeData,
    regEx: regEx
}