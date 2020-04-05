// Get dependencies
var express = require('express');
var router = express.Router();

router.get('/', function (req, re, next) {
res.render('index', { title: 'CMS' });
});
module.exports = router;

var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ...

// establish a connection to the mongo database
// *** Important *** change yourPort and yourDatabase
//     to those used by your database
mongoose.connect('mongodb://localhost:27017/cms',
  { useNewUrlParser: true }, (err, res) => {
    if (err) {
      console.log('Connection failed');
    }
    else {
      console.log('Connected to database!');
    }
  }
);

var app = express('/', index); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist')));

// Tell express to map the default route ("/") to the index route
app.use('/', index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...

// Tell express to map all other non-defined routes back to the index page
app.get(function(req, res, next) {
  res.render("index");
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {console.log("API running on localhost: " + port)});
