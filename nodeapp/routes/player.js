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
      let parameter = req.params.username;

  let resultArray = Object.values(JSON.parse(JSON.stringify(data)));
  let PlayerPerPage = 1;  
  
  sql = `SELECT PLAYER, UUID, GAMETYPE FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC`;
  global.row;
  global.push_player = [];
  Object.keys(data).forEach(function(key) {
    row = data[key];
    push_player.push(row.PLAYER, row.UUID);
    // console.log(push_player);
  });
  
  sql = `SELECT PLAYER, UUID, GAMETYPE FROM leaderboard WHERE GAMETYPE in ("Owner", "Admin", "Moderator", "ChatMod", "Trial")`;
  db.query(sql, function (err, rank_data, fields) {
  global.row_rank;
  global.rank_array = [];
  Object.keys(rank_data).forEach(function(key) {
    row_rank = rank_data[key];
    rank_array.push(row_rank.PLAYER, row_rank.UUID, row_rank.GAMETYPE);
    // console.log(push_player);
  });

  db.query(sql, (err, data) =>{
    if (err) {
      global.location = "https://localhost:3000";
    }

    res.render('player', {userData: data, PlayerPerPage, row, push_player, parameter, resultArray, row_rank, rank_array,});  
});
});
}); 
});

module.exports = router;