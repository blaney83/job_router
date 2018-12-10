// let builtURL = "https://www.dice.com/jobs/q-Software_Engineer-l-Phoenix%2C_AZ-radius-30-startPage-1-jobs"

let dicePackage = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.dice.com/jobs/q-Software_Engineer-l-Phoenix,_AZ-radius-30-startPage-1-jobs",
    "method": "GET",
    "headers": {
        "cache-control": "no-cache",
        "Postman-Token": "757221dc-de3d-4dab-ba79-e152bcc16156"
    }
}

const axios = require("axios")

axios("https://www.dice.com/jobs?q=Software+Engineer&l=Phoenix%2C+AZ", {
    method: "GET"
}).then(resp => {
    console.log("working")
    let begArr = resp.data.split('<div id="serp">')
    begArr.splice(0,1)
    let bob = begArr[0].split("<div id='dice_paging_btm'></div>")
    let jobArr = bob[0].split('<div class="complete-serp-result-div"')
    jobArr.splice(0,1)
    jobArr.map((val, i)=>{
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
        if(secLogoSplit[0].includes("<img")){
            let thirLogoSplit = secLogoSplit[0].split('src="')
            let fourLogoSplit = thirLogoSplit[1].split('"')
            compLogo = "https:" + fourLogoSplit[0]
        }
        let easilyApply = false
        if(val.includes("easy-apply")){
            easilyApply = true
        }
        let jobObj = {
                jobSite: "Dice",
                postingAge: diceRegEx(secPostAge[0]),
                jobLink : "https://www.dice.com" + secLinkSplit[0],
                positionTitle: secTitleSplit[0],
                easilyApply: easilyApply,
                jobId: secIdSplit[0],
                companyImage: compLogo,
                jobCompany: secCompSplit[0],
                jobLocation: secLocSplit[0],
                salaryRange: null,
                jobDescription: thirDescSplit[0]
        }
        console.log(jobObj)
    })
}).catch(err => {
    console.log("Something broke: " + err)
})

function diceRegEx(str){
    let str1 = str.replace(/\n/g, "")
    let str2 = str1.replace(/\t/g, "")
    if(str2.length>0){
        return str2.trim()
    }else{
        return null
    }
}