var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET player page. */
router.get('/', function(req, res, next) {
    let sql='SELECT PLAYER FROM leaderboard';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
  let resultsPerPage = data.PLAYER;
  const numOfResults = data.PLAYER;

    if (resultsPerPage === numOfResults)
    res.redirect("http://localhost:3000/player/?player="+encodeURIComponent(numOfResults));
  
    res.render('player', {userData: data});
});
});

module.exports = router;