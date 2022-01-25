var express = require('express');
var router = express.Router();
var db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/leaderboard', function(req, res, next) {
    var sql='SELECT * FROM License';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('leaderboard', { title: 'User List', userData: data});
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
