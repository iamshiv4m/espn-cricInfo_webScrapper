const request = require("request");
const cheerio = require("cheerio");
const scoreCardObj = require("./scoreCard");

function getAllMatchesLink(url) {
  request(url, function (err, response, html) {
    if (err) {
      console.log(err);
    } else {
      extractAllLinks(html);
    }
  });
}

function extractAllLinks(html) {
  let $ = cheerio.load(html);
  let scoreCardElems = $("a[data-hover='Scorecard']");
  for (let i = 0; i < scoreCardElems.length; i++) {
    let link = $(scoreCardElems[i]).attr("href");
    let fullLink = "https://www.espncricinfo.com" + link;
    console.log(fullLink);
    scoreCardObj.ps(fullLink);
  }
}

module.exports = {
  getAllMatches: getAllMatchesLink,
};
