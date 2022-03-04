var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET player page. */
    router.get('/:username', function(req, res, next) {
    let sql='SELECT UUID, PLAYER FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
    db.query(sql, function (err, data, fields) {
  
      let params = req.params.username;

  //Determine the SQL LIMIT starting number
  let PlayerPerPage = 1;  
  // Get the releavant number of POSTS for this starting page
  sql = `SELECT UUID, PLAYER FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC LIMIT ${params}, ${PlayerPerPage}`;
  console.log(params);
  console.log(PlayerPerPage);
  console.log(sql);
  db.query(sql, (err, data) =>{


    res.render('player', {userData: data, PlayerPerPage, params});    
});
}); 
});

module.exports = router;