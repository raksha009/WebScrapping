const request = require("request");
const cheerio = require("cheerio");
const scoreCardObj = require("./scorecard");

function getAllMatchesLink(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log(err);
        }
        else {
            extractAllLinks(html);
        }
    })
}

function extractAllLinks(html) {
    // Laoding html to parse in $(selector)
    // If the seslector is unquie match => returns that elem
    // else returns array
    let $ = cheerio.load(html);
    
    // cheerio wraps the accessed index/attribute value 
    let scorecardElems = $("a[data-hover='Scorecard']");
    // Parsing through all the values of returned array
    for (let i = 0; i < scorecardElems.length; i++) {
        let link = $(scorecardElems[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;
        // console.log(fullLink);
        scoreCardObj.ps(fullLink);   // ps is function in scorecard.js
    }
}
// Exporting the getAllMatchesLink function 
module.exports = {
    gAlmatches: getAllMatchesLink
}