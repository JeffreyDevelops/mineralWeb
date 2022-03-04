var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET player page. */
router.get('/', function(req, res, next) {
    let sql='SELECT UUID, PLAYER FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
    db.query(sql, function (err, data, fields) {

  
  let page = req.query.player ? String(req.query.player) : "Steve";
  
  //Determine the SQL LIMIT starting number
  let PlayerPerPage = 5;  
  // Get the releavant number of POSTS for this starting page
  sql = `SELECT UUID, PLAYER FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC LIMIT ${page}, ${PlayerPerPage}`;
  console.log(PlayerPerPage);
  console.log(page);
  console.log(sql);
  db.query(sql, (err, data) =>{


    res.render('player', {userData: data, page, PlayerPerPage});    
});
}); 
});

module.exports = router;