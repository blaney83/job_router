// let builtURL = "https://www.dice.com/jobs/q-Software_Engineer-l-Phoenix%2C_AZ-radius-30-startPage-1-jobs"
// https://www.dice.com/jobs/q-software_engineer-Phoenix,_AZ-radius-30-startPage-2-jobs

const axios = require("axios")
async function diceGetData(search, loc, numb) {
    try {
        let sP = search.trim()
        let sP1 = sP.toLowerCase()
        let sP2 = sP1.replace(/ /g, "_")
        let sP3 = sP1.replace(/ /g, "_")
        let lP = loc.trim()
        let lP2 = lP.replace(/ /g, "_")
        let lP21 = lP.replace(/ /g, "+")
        let lP3 = lP2.replace(/,/, "%2C")
        let lP31 = lP21.replace(/,/, "%2C")
        let dicePromiseHolder = []
        for (var carI = 1; carI < numb; carI++) {
            let builtURL = "https://www.dice.com/jobs/q-" + sP2 + "-" + lP3 + "-radius-30-startPage-" + carI + "-jobs"
            if (carI == 1) {
                builtURL = "https://www.dice.com/jobs?q=" + sP3 + "&l=" + lP31
                // builtURL = "https://www.dice.com/jobs/q-" + sP2 + "-" + lP3 + "-radius-30-startPage-jobs"
            }
            dicePromiseHolder[carI - 1] = axios(builtURL).catch(err => err)
        }
        await Promise.all(dicePromiseHolder).then(respArr => {
            return(respArr.map(resp => {
                if (resp.status != undefined) {
                    return (diceUpSomeData(resp))
                } else {
                    return (diceUpSomeData(resp.response))
                }
            }))
        }).catch(err => err)
    } catch{ e => e }
}

//then
function diceUpSomeData(resp) {
    let begArr = resp.data.split('<div id="serp">')
    begArr.splice(0, 1)
    let bob = begArr[0].split("<div id='dice_paging_btm'></div>")
    let jobArr = bob[0].split('<div class="complete-serp-result-div"')
    jobArr.splice(0, 1)
    let diceDataHolder = []
    jobArr.map((val, i) => {
        let linkSplit = val.split('href="')
        let secLinkSplit = linkSplit[1].split('"')
        let titleSplit = val.split('title="')
        let secTitleSplit = titleSplit[1].split('"')
        let secLocSplit = titleSplit[3].split('"')
        let compSplit = val.split('title = "')
        let secCompSplit = compSplit[1].split('"')
        let postAge = val.split("2'></span>")
        let secPostAge = postAge[2].split("<")
        let descSplit = val.split('class="shortdesc')
        let secDescSplit = descSplit[1].split('<span>')
        let thirDescSplit = secDescSplit[1].split('</span>')
        let logoSplit = val.split('"logopath">')
        let compLogo = 'https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-35-512.png'
        let idSplit = val.split('id ="viewedId')
        let secIdSplit = idSplit[1].split('"')
        let secLogoSplit = logoSplit[1].split('</div')
        if (secLogoSplit[0].includes("<img")) {
            let thirLogoSplit = secLogoSplit[0].split('src="')
            let fourLogoSplit = thirLogoSplit[1].split('"')
            compLogo = "https:" + fourLogoSplit[0]
        }
        let easilyApply = false
        if (val.includes("easy-apply")) {
            easilyApply = true
        }
        let jobObj = {
            jobSite: "Dice",
            postingAge: diceRegEx(secPostAge[0]),
            jobLink: "https://www.dice.com" + secLinkSplit[0],
            positionTitle: secTitleSplit[0],
            easilyApply: easilyApply,
            jobId: secIdSplit[0],
            companyImage: compLogo,
            jobCompany: secCompSplit[0],
            jobLocation: secLocSplit[0],
            salaryRange: null,
            jobDescription: thirDescSplit[0]
        }
        diceDataHolder.push(jobObj)
    })
    return (diceDataHolder)
}

function diceRegEx(str) {
    let str1 = str.replace(/\n/g, "")
    let str2 = str1.replace(/\t/g, "")
    if (str2.length > 0) {
        return str2.trim()
    } else {
        return null
    }
}

module.exports = {
    diceDataGet: diceDataGet,
    diceRegEx: diceRegEx,
    diceUpSomeData: diceUpSomeData
}
//example call
// diceGetData("Software Engineer", "Phoenix, AZ", 5)