var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

  request("https://www.nytimes.com/section/world", function (err, res, html) {

    var $ = cheerio.load(html);

    var articles = [];

    $("div.story-body").each(function (i, element) {

      var head = $(element).find("h2.headline").text().trim();

      var url = $(element).find("a").attr("href");

      var sum = $(element).find("p.summary").text().trim();

      if (head && sum && url) {

        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();



        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });

    cb(articles);
  });
};

module.exports = scrape;