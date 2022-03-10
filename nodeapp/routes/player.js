var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET player page. */
    router.get('/:username', function(req, res, next) {
    let sql='SELECT PLAYER, UUID FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
    db.query(sql, function (err, data, fields) {
    if (err) {
      global.location = "https://localhost:3000";
    }
      let params = parseInt(req.params.username);
      let parameter = req.params.username;

  let resultArray = Object.values(JSON.parse(JSON.stringify(data)));
  let PlayerPerPage = 1;  
  
  sql = `SELECT PLAYER, UUID FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC`;
  global.row;
  global.push_player = [];
  Object.keys(data).forEach(function(key) {
    row = data[key];
    push_player.push(row.PLAYER, row.UUID);
    // console.log(push_player);
  });
  
  let UUID = push_player.indexOf(parameter);
  let UUID_player = push_player[UUID + 1];


  if (push_player.includes(parameter) === false) {
    
    res.send(`<h1>Something went wrong...</h1>`);
     
  }

  db.query(sql, (err, data) =>{
    if (err) {
      global.location = "https://localhost:3000";
    }

    res.render('player', {userData: data, PlayerPerPage, push_player, parameter, resultArray, UUID, UUID_player});  
});
}); 
});

module.exports = router;