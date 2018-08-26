var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var exphbs  = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");
var path = require("path");

//var db = require("./models");

var PORT = 3000;

var app = express();

app.use(express.static("./public"));
app.get('/', function (req, res) {
    res.render('index');
});

app.get('*', function (req, res) {
    res.render('404');
});

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

