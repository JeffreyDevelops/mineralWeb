var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET player page. */
    router.get('/:username', function(req, res, next) {
    let sql='SELECT PLAYER, UUID FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
    db.query(sql, function (err, data, fields) {
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
  });
  
  sql = `SELECT * FROM jeezycore WHERE playerName LIKE '%${parameter}%'`;
  db.query(sql, function (err, rank_data, fields) {
  global.row_rank;
  global.rank_name = "";
  Object.keys(rank_data).forEach(function(key) {
    row_rank = rank_data[key];
    rank_name = row_rank.rankName;
  });

  sql = `SELECT * FROM status WHERE playerName = '${parameter}'`;
  db.query(sql, function (err, skin_data, fields) {
  global.row_skin;
  global.player_show_skin;
  Object.keys(skin_data).forEach(function(key) {
    row_skin = skin_data[key];
    player_show_skin = row_skin.playerUUID;
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

  sql = `SELECT GAMETYPE, PLAYER, ELO FROM leaderboard ORDER BY PLAYER DESC;`;
  db.query(sql, function (err, gametype_data, fields) {
  global.gametypes = [];
  global.gametypes_player = [];
  global.gametypes_elo = [];
  global.gametypes_gamemodes = [];
  Object.keys(gametype_data).forEach(function(key) {
    row_gametype = gametype_data[key];
    gametypes_gamemodes.push(row_gametype.GAMETYPE);
    gametypes.push(row_gametype.ELO);
    gametypes_player.push(row_gametype.PLAYER);
    gametypes_elo.push(row_gametype.GAMETYPE, row_gametype.PLAYER, row_gametype.ELO);
  });

  let final_gametypes = [...new Set(gametypes_gamemodes)];

  sql = `SELECT * FROM leaderboard WHERE PLAYER = '${parameter}'`;
  db.query(sql, function (err, player_data, fields) {
  global.get_player_stats = [];
  Object.keys(player_data).forEach(function(key) {
    row_gametype = player_data[key];
    get_player_stats.push(row_gametype.GAMETYPE, row_gametype.PLAYER, row_gametype.ELO);
  });

    res.render('player', {userData: data, PlayerPerPage, row, push_player, parameter, resultArray, rank_name, player_show_skin, row_nod, nod_array, nod_elo_array, gametypes, row_gametype, gametypes_player, allGametypes: final_gametypes, gametypes_elo, get_player_stats});  
}); 
});   
});
});
}); 
});
});
});
module.exports = router;