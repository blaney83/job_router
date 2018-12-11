
const axios = require("axios")

async function indeedGetData(search, loc, numb) {
    try {
        let lP1 = loc.trim()
        let lP4 = lP1.split(",")
        let lP5 = lP4[1].toUpperCase()
        let lP25 = lP4[0] + lP5
        let lP2 = lP25.replace(",", "%2C")
        let lP3 = lP2.replace(/ /g, "+")
        let sP1 = search.trim()
        let sP2 = sP1.toLowerCase()
        let sP3 = sP2.replace(/ /g, "+")
        let indeedPromiseHolder = []
        let urlHolder = []
        for (var carI = 1; carI < numb; carI++) {
            let builtURL = "https://www.indeed.com/jobs?q=" + sP3 + "&l=" + lP3 + "&start=" + (carI - 1) + "0"
            // console.log(builtURL)
            indeedPromiseHolder[carI - 1] = axios(builtURL)
            urlHolder[carI - 1] = builtURL
        }
        // console.log(indeedPromiseHolder)
        await Promise.all(indeedPromiseHolder).then(resp => {
            // console.log("resolved")
            let dataPromiseHolder = []
            resp.forEach((val, i) => {
                dataPromiseHolder[i] = new Promise(function (resolve, reject) {
                    resolve(indeedSomeData(val, urlHolder[i]))
                })
            })
            Promise.all(dataPromiseHolder).then(resp => {
                // console.log(resp.length)
                // console.log(resp[0].length)
                return(resp)
            })
        })
    } catch{ e => e }
}

function indeedSomeData(resp, builtURL) {
    // console.log("resolved")
    let secArr = resp.data.split('<td id="resultsCol">')
    let firArr = secArr[1].split('<div class="result-link-bar-container">')
    let myInd = firArr.length - 1
    firArr.splice(myInd, 1)
    let finishedDataArray = []
    firArr.map((jobArr, i) => {
        // console.log(jobArr.length)
        let ageArr = jobArr.split('JobAge\'] = "')
        let secAgeArr = [null]
        if (ageArr.length > 1) {
            secAgeArr = ageArr[1].split('";window')
        }
        let compArr = jobArr.split('"company">\n')
        let secCompArr = compArr[1].split('</span>')
        let yaz = secCompArr[0].split('rel="noopener"\n')
        if (yaz.length > 1) {
            let zay = yaz[1].split('</a>')
            secCompArr = [zay[0]]
        }
        let salArr = jobArr.split('salary no-wrap">')
        let secSalArr = [null]
        if (salArr.length > 1) {
            let blah = salArr[1].split("</span>")
            secSalArr = [regEx(blah[0])]
        }
        let locArr = jobArr.split('data-rc-loc="')
        let secLocArr = locArr[1].split('" style')
        let posArr = jobArr.split('(\'SJ\')">')
        let secPosArr = [null]
        if (posArr.length > 1) {
            let booNahNah = posArr[1].split('</a')
            secPosArr = [regEx(booNahNah[0])]
        } else {
            let zyt = posArr[0].split('title="')
            let xtw = zyt[2].split('"\n')
            let garbArb = xtw[0].split('/salaries/')
            if (garbArb.length > 1) {
                let secGarbArb = garbArb[1].split("-Salaries")
                secPosArr = [regEx(secGarbArb[0])]
            }
        }
        let descArr = jobArr.split('summary>\n')
        let booEy = descArr[1].split("</span")
        let secDescArr = [regEx(booEy[0])]
        let linkArr = jobArr.split('jobtitle turnstileLink" href="')
        let secLinkArr = [builtURL]
        if (linkArr.length > 1) {
            let blooBloo = linkArr[1].split('"')
            secLinkArr = ["https://www.indeed.com" + blooBloo[0]]
        } else {
            secLinkArr = [builtURL]
        }
        let easyArr = [false]
        if (jobArr.includes('Easily apply')) {
            easyArr = [true]
        }
        let idArr = jobArr.split('<a id="')
        let secIdArr = idArr[1].split('" href')
        let jobObj = {
            jobSite: "Indeed",
            postingAge: secAgeArr[0],
            jobLink: secLinkArr[0],
            positionTitle: secPosArr[0],
            easilyApply: easyArr[0],
            jobId: secIdArr[0],
            companyImage: 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-35-512.png',
            jobCompany: regEx(secCompArr[0]),
            jobLocation: secLocArr[0],
            salaryRange: secSalArr[0],
            jobDescription: secDescArr[0]
        }
        // console.log(jobObj)
        finishedDataArray.push(jobObj)
    })
    return(finishedDataArray)
}

function regEx(str) {
    let sN = str.replace(/>\n/g, "")
    let s1 = sN.trim();
    let s2 = s1.replace(/<b>/g, "")
    let s3 = s2.replace(/<\/b>/g, "")
    let s4 = s3.replace(/&#x2F/g, "/")
    let s5 = s4.replace(/&nbsp/g, "")
    let s6 = s5.replace(/&amp;/g, "&")
    let s7 = s6.replace(/&#x27;/g, "'")
    let s8 = s7.replace(/\'/g, "'")
    return (s8)
}

//example call
// indeedGetData("software engineer", "phoenix, az", 4)

module.exports = {
    indeedGetData: indeedGetData,
    indeedSomeData: indeedSomeData,
    regEx: regEx
}