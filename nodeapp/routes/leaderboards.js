var express = require('express');
var router = express.Router();
let db=require('../database');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let sql='SELECT GAMETYPE, PLAYER, UUID, ELO FROM leaderboard ORDER BY GAMETYPE DESC, ELO DESC';
  db.query(sql, async function (err, data, fields) {
    global.row;
    global.push_player_elo = [];
    global.push_player_player = [];
    global.push_player_UUID = [];
    global.push_player = [];
    global.d_gametypes = [];
    Object.keys(data).forEach(async function(key) {
      row = data[key];
      push_player.push(row.GAMETYPE, row.PLAYER, row.ELO);
      push_player_elo.push(row.ELO);
      push_player_player.push(row.PLAYER);
      push_player_UUID.push(row.UUID);
      d_gametypes.push(row.GAMETYPE);
      });
      
      sql='SELECT PLAYER FROM leaderboard WHERE Gametype="Nodebuff" ORDER BY ELO DESC';
      db.query(sql, async function (err, p_data, fields) {
        let resultArray = Object.values(JSON.parse(JSON.stringify(p_data)));
        var ee;
        var pp = [];
        Object.keys(p_data).forEach(async function(key) {
          ee = p_data[key];
          pp.push(ee.PLAYER);
          });

        sql = `SELECT GAMETYPE, PLAYER, ELO FROM leaderboard ORDER BY PLAYER DESC;`;
        db.query(sql, function (err, gametype_data, fields) {

          global.gametypes_gamemodes = [];

          Object.keys(gametype_data).forEach(function(key) {
            row_gametype = gametype_data[key];
            gametypes_gamemodes.push(row_gametype.GAMETYPE);
          });
          let final_gametypes = [...new Set(gametypes_gamemodes)];
          
      res.render('leaderboards', {userData: data, data, p_data, push_player, resultArray, pp, ee, row, allGametypes: final_gametypes, push_player_elo,  push_player_player, push_player_UUID, d_gametypes});
});      
});
});
});



module.exports = router;
