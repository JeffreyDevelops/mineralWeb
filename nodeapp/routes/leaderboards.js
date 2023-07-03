var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET home page. */
router.get('/', async function(req, res, next) {
  db.conn_practice.query('SELECT `GAMETYPE`, `PLAYER`, `UUID`, `ELO` FROM `elo` ORDER BY `GAMETYPE` DESC, `ELO` DESC;',
    async function (err, data, fields) {
    global.row;
    global.push_player_elo = [];
    global.push_player_player = [];
    global.push_player_UUID = [];
    global.d_gametypes = [];
    global.leaderboards_data = [];
    Object.keys(data).forEach(async function(key) {
      row = data[key];
      push_player_elo.push(row.ELO);
      push_player_player.push(row.PLAYER);
      push_player_UUID.push(row.UUID);
      d_gametypes.push(row.GAMETYPE);
      leaderboards_data.push(row.GAMETYPE, row.PLAYER, row.UUID, row.ELO);
      });

      db.conn_core.query('SELECT `playerName`, `playerUUID` FROM `players`;',
      async function (err, data, fields) {
        global.push_player = [];
        Object.keys(data).forEach(function(key) {
        row = data[key];
        push_player.push(row.playerName, row.playerUUID);
    });


        db.conn_practice.query('SELECT `GAMETYPE`, `PLAYER`, `ELO` FROM `elo` ORDER BY `PLAYER` DESC;', 
        async function (err, gametype_data, fields) {
          global.gametypes_gamemodes = [];

          Object.keys(gametype_data).forEach(function(key) {
            row_gametype = gametype_data[key];
            gametypes_gamemodes.push(row_gametype.GAMETYPE);
          });
          let final_gametypes = [...new Set(gametypes_gamemodes)];
          
      res.render('leaderboards', {userData: data, data, push_player, row, allGametypes: final_gametypes, push_player_elo,  push_player_player, push_player_UUID, d_gametypes, leaderboards_data});
});      
});
});
});



module.exports = router;
