//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Create connection to database
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "comments"
});

//Connect to database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Create a table to store comments
app.get('/create', function (req, res) {
  var sql = "CREATE TABLE comments (comment VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    res.send("Table created");
  });
});

//Add a comment to the table
app.post('/add', function (req, res) {
  var comment = req.body.comment;
  var sql = "INSERT INTO comments (comment) VALUES ('" + comment + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send("1 record inserted");
  });
});

//Get all comments from the table
app.get('/get', function (req, res) {
  var sql = "SELECT * FROM comments";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

//Delete all comments from the table
app.get('/delete', function (req, res) {
  var sql = "DELETE FROM comments";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("All records deleted");
    res.send("All records deleted");
  });
});

//Start server on port 3000
app.listen(3000, function () {
  console.log('Server is listening on port 3000');
});