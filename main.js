// Scrapping data from this URL
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
// Creating File via File System Module (predefined in node)
const fs = require("fs");

// Setting generic path so that main.js could be called at some other location as well (path - predefined module in js)
const path = require("path");

// DATA REQUESTED:  Venue date opponent result runs balls fours sixes sr
const request = require("request");
// Cheerio is used to parse the extracted html data 
const cheerio = require("cheerio");  
const AllMatcgObj = require("./Allmatch");

// Create IPL folder (that stores the extracted data) in the same curr directory
const iplPath = path.join(__dirname, "ipl");
dirCreater(iplPath);
request(url, cb);
// Async func
function cb(err, response, html) {   // cb = callback
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractLink(html);
    }
}

// Extract data via css selector 
function extractLink(html) {
    let $ = cheerio.load(html);
    let anchorElem = $("a[data-hover='View All Results']");
    // 
    let link = anchorElem.attr("href");
    // console.log(link);
    let fullLink = "https://www.espncricinfo.com" + link;
    console.log(fullLink);
    AllMatcgObj.gAlmatches(fullLink);
}

// Create directory if not there else only update it
function dirCreater(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }

}