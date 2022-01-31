let express = require('express');
let router = express.Router();
let db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table




/* Leaderboard listening.*/
router.get('/', function(req, res, next) {
  let sql='SELECT * FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('leaderboard', { title: 'leaderboard_user', userData: data});
});
});

router.get('/1', function(req, res, next) {
  let sql='SELECT * FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO ASC';
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('leaderboard', { title: 'leaderboard_user', userData: data});
});
});


module.exports = router;
