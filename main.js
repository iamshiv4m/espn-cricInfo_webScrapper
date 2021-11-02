const url = "https://www.espncricinfo.com/series/ipl-2021-1249214";
const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const allMatchObject = require("./allMatch");

const iplPath = path.join(__dirname, "ipl");
dirCreator(iplPath);
// Home Page Link
request(url, cb);

function cb(err, response, html) {
  if (err) {
    console.log(err);
  } else {
    // console.log(html);
    extractLink(html);
  }
}

// Full Page Link
function extractLink(html) {
  let $ = cheerio.load(html); // parse html
  let anchorElement = $("a[data-hover='View All Results']");
  let links = anchorElement.attr("href");
  //   console.log(links);
  let fullLink = "https://www.espncricinfo.com" + links; // for getting full link
  // console.log(fullLink);
  allMatchObject.getAllMatches(fullLink);
}

function dirCreator(filePath) {
  if (fs.existsSync(filePath) == false) {
    fs.mkdirSync(filePath);
  }
}
