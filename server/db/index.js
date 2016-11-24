var mysql = require('mysql');
var Promise = require('bluebird');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

con.connect(function(err) {
  if (err) {
    console.log('error');
    return;
  }
  console.log('connection established');
});

con.end(function(err) {
  console.log('connection ended');
});