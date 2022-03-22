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
  db.query(sql, (err, data) =>{
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

  sql = `SELECT PLAYER, ELO, GAMETYPE FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC`;
  db.query(sql, function (err, nod_data, fields) {
  global.row_nod;
  global.nod_array = [];
  global.nod_elo_array = [];
  Object.keys(nod_data).forEach(function(key) {
    row_nod = nod_data[key];
    nod_array.push(row_nod.PLAYER);
    nod_elo_array.push(row_nod.ELO);
  });

  sql = `SELECT GAMETYPE, PLAYER, ELO FROM leaderboard ORDER BY PLAYER DESC, ELO DESC;`;
  db.query(sql, function (err, gametype_data, fields) {
  global.gametypes = [];
  global.gametypes_player = [];
  global.gametypes_elo = [];
  global.gametypes_gamemodes = [];
  Object.keys(gametype_data).forEach(function(key) {
    row_gametype = gametype_data[key];
    gametypes_gamemodes.push(row_gametype.GAMETYPE);
    gametypes.push(row_gametype.GAMETYPE, row_gametype.PLAYER, row_gametype.ELO);
    gametypes_player.push(row_gametype.PLAYER, row_gametype.ELO);
    gametypes_elo.push(row_gametype.GAMETYPE, row_gametype.PLAYER, row_gametype.ELO);
  });

  
  let final_gametypes = [...new Set(gametypes_gamemodes)];

    res.render('player', {userData: data, PlayerPerPage, row, push_player, parameter, resultArray, row_rank, rank_array, row_nod, nod_array, nod_elo_array, gametypes, row_gametype, gametypes_player, allGametypes: final_gametypes, gametypes_elo, });  
}); 
});   
});
});
}); 
});

module.exports = router;