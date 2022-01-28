let express = require('express');
let router = express.Router();
let db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/leaderboard', function(req, res, next) {
    let sql='SELECT * FROM elo';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('leaderboard', { title: 'leaderboard_user', userData: data});
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
